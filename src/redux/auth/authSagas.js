import { all, put, call, takeLatest } from "redux-saga/effects";

import auth from "../../api/auth";
import * as types from "./authActionsTypes";


function *login ({ payload }) {
  yield put({ type: types.TOGGLE_PROCESSING, payload: true });

  try {
    const response = yield call(auth.login, payload);
    yield put({ type: types.LOGIN_REQUEST_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: types.AUTH_REQUEST_ERROR, error });
  } finally {
    yield put({ type: types.TOGGLE_PROCESSING, payload: false });
  }
}

function *register ({ payload }) {
  yield put({ type: types.TOGGLE_PROCESSING, payload: true });

  try {
    const response = yield call(auth.register, payload);
    yield put({ type: types.REGISTER_REQUEST_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: types.AUTH_REQUEST_ERROR, error });
  } finally {
    yield put({ type: types.TOGGLE_PROCESSING, payload: false });
  }
}

function *logout () {
  yield put({ type: types.TOGGLE_PROCESSING, payload: true });

  try {
    const response = yield call(auth.logout);
    yield put({ type: types.LOGOUT_REQUEST_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: types.AUTH_REQUEST_ERROR, error });
  } finally {
    yield put({ type: types.TOGGLE_PROCESSING, payload: false });
  }
}


export default function *() {
  yield all([
    yield takeLatest(types.LOGIN_REQUEST, login),
    yield takeLatest(types.REGISTER_REQUEST, register),
    yield takeLatest(types.LOGOUT_REQUEST, logout),
  ])
}
