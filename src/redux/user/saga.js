import { put, takeEvery } from "redux-saga/effects";
import { saveLoginDaetails } from "./persistReducer";

function* loginSaga() {
  console.log("reached saga");
  yield put(saveLoginDaetails({}));
}

function* userSaga() {
  yield takeEvery("userReducer/loginFetch", loginSaga);
}

export default userSaga;
