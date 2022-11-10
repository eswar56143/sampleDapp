import { put, takeEvery } from "redux-saga/effects";
import { httpGet, httpPost } from "../../utils/axiosConnect";
import { PUBLIC_URL, STATUS_CODE } from "../../utils/constants";
import { encryptLoginPassword, encryptPassword } from "../../utils/encrypt";
import { toasts } from "../../utils/toast";
import { saveLoginDaetails } from "./persistReducer";
import {
  loginFailure,
  loginSuccess,
  registerFailure,
  registerSuccess,
} from "./reducer";

function* loginSaga({ payload }) {
  try {
    const response = yield httpPost(
      `${PUBLIC_URL}/login`,
      {},
      { mobileNumber: payload.mobile, password: payload.password }
    );
    if (response.status === STATUS_CODE.successful) {
      yield put(saveLoginDaetails(response?.data));
      yield put(loginSuccess());
    } else {
      toasts.error(response?.data?.message);
      yield put(loginFailure());
    }
  } catch (error) {
    toasts.error(error?.message);
    yield put(loginFailure());
  }
}

function* saltSaga({ payload }) {
  try {
    const response = yield httpGet(
      `${PUBLIC_URL}/salt`,
      {},
      { mobileNumber: payload.mobile }
    );
    if (response.status === STATUS_CODE.successful) {
      const key = yield encryptLoginPassword(
        payload.password,
        response?.data?.salt
      );
      const password = yield encryptLoginPassword(
        key + response?.data?.userId,
        response?.data?.salt
      );
      payload.password = password;
      yield loginSaga({ payload });
    } else {
      toasts.error(response?.data?.message);
      yield put(loginFailure());
    }
  } catch (error) {
    toasts.error(error?.message);
    yield put(loginFailure());
  }
}

function* registerSaga({ payload }) {
  try {
    const { salt, key } = yield encryptPassword(payload?.password);
    const { fullName, username, mobile, countryCode, email, acceptTerms } =
      payload;
    const body = {
      fullName,
      username,
      mobile,
      countryCode,
      email,
      password: key,
      salt,
      acceptTerms,
    };
    const response = yield httpPost(`${PUBLIC_URL}/register`, {}, body);
    if (response.status === STATUS_CODE.successful) {
      yield put(registerSuccess(body));
    } else {
      toasts.error(response?.data?.message);
      yield put(registerFailure());
    }
  } catch (error) {
    toasts.error(error?.message);
    yield put(registerFailure());
  }
}

function* userSaga() {
  yield takeEvery("userReducer/loginFetch", saltSaga);
  yield takeEvery("userReducer/registerFetch", registerSaga);
}

export default userSaga;
