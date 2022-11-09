import { put, takeEvery } from "redux-saga/effects";
import { httpGet, httpPost } from "../../utils/axiosConnect";
import { PUBLIC_URL, STATUS_CODE } from "../../utils/constants";
import { encryptLoginPassword, encryptPassword } from "../../utils/encrypt";
import { toasts } from "../../utils/toast";
import { saveLoginDaetails } from "./persistReducer";
import { loginFailure, loginSuccess } from "./reducer";

function* loginSaga(payload) {
  try {
    const response = yield httpPost(`${PUBLIC_URL}/login`, payload, {});
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
      console.log(response.data);
    } else {
      toasts.error(response?.data?.message);
      yield put(loginFailure());
    }
  } catch (error) {
    toasts.error(error?.message);
    yield put(loginFailure());
  }
}

function* userSaga() {
  yield takeEvery("userReducer/loginFetch", saltSaga);
}

export default userSaga;
