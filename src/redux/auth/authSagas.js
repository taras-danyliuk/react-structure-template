import { all, put, call, takeLatest } from "redux-saga/effects";

import { auth } from "../../api/auth";
import * as types from "./authActionsTypes";


function *login ({ data }) {
  yield put({ type: types.SHOW_LOADING });

  try {
    const response = yield call(auth.login, data);
    yield put({ type: types.LOGIN_REQUEST_SUCCESS, response });
  } catch (error) {
    yield put({ type: types.LOGIN_REQUEST_ERROR, error: error.error });
  } finally {
    yield put({ type: types.HIDE_LOADING })
  }
}

function *register ({ data }) {
  yield put({ type: types.SHOW_LOADING });

  try {
    const response = yield call(auth.register, data);
    yield put({ type: types.REGISTER_REQUEST_SUCCESS, response });
  } catch (error) {
    yield put({ type: types.REGISTER_REQUEST_ERROR, error });
  } finally {
    yield put({ type: types.HIDE_LOADING })
  }
}

function *logout () {
  yield put({ type: types.SHOW_LOADING });

  try {
    const response = yield call(auth.logout);
    yield put({ type: types.LOGOUT_REQUEST_SUCCESS, response });
  } catch (error) {
    yield put({ type: types.LOGOUT_REQUEST_ERROR, error });
  } finally {
    yield put({ type: types.HIDE_LOADING })
  }
}


export default function *() {
  yield all([
    yield takeLatest(types.LOGIN_REQUEST, login),
    yield takeLatest(types.REGISTER_REQUEST, register),
    yield takeLatest(types.LOGOUT_REQUEST, logout),
  ])
}
