import { put, takeEvery } from "redux-saga/effects";
import { httpGet, httpPost } from "../../utils/axiosConnect";
import { PUBLIC_URL, STATUS_CODE } from "../../utils/constants";
import { encryptLoginPassword, encryptPassword } from "../../utils/encrypt";
import { toasts } from "../../utils/toast";
import { clearLoginDaetails, saveLoginDaetails } from "./persistReducer";
import {
  loginFailure,
  loginSuccess,
  logoutFailure,
  logoutSuccess,
  registerFailure,
  registerSuccess,
} from "./reducer";

function* loginSaga({ payload }) {
  try {
    const data = {
      contact: payload?.mode === 0 ? payload.username : payload.mobile,
      password: payload.key,
    };
    const response = yield httpPost(`${PUBLIC_URL}/login`, {}, data);
    if (response?.status === STATUS_CODE.successful) {
      toasts.success(response?.data?.message);
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
    const data = payload?.mode === 0 ? payload.username : payload.mobile;
    const response = yield httpGet(
      `${PUBLIC_URL}/salt`,
      {},
      { contact: data, mode: payload?.mode }
    );
    if (response?.status === STATUS_CODE.successful) {
      const key = yield encryptLoginPassword(
        payload.password,
        response?.data?.salt
      );
      const password = yield encryptLoginPassword(
        key + response?.data?.userId,
        response?.data?.salt
      );
      payload.key = password;
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
    const { salt, key } = yield encryptPassword(payload?.values?.password);
    const { fullName, username, mobile, countryCode, email, acceptTerms } =
      payload.values;
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
    if (response?.status === STATUS_CODE.successful) {
      yield put(registerSuccess(body));
      yield put(payload.registerCallback());
    } else {
      toasts.error(response?.data?.message || "something went wrong!I");
      yield put(registerFailure());
    }
  } catch (error) {
    toasts.error(error?.message);
    yield put(registerFailure());
  }
}

function* logoutSaga() {
  try {
    toasts.success('Successfully logged out')
    yield put(logoutSuccess());
    yield put(clearLoginDaetails());
  } catch (error) {
    toasts.error(error?.message);
    yield put(logoutFailure());
  }
}

function* userSaga() {
  yield takeEvery("userReducer/loginFetch", saltSaga);
  yield takeEvery("userReducer/registerFetch", registerSaga);
  yield takeEvery("userReducer/logoutFetch", logoutSaga);
}

export default userSaga;
