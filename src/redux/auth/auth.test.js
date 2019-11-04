/* eslint no-undefined: 0 */

import { call } from "redux-saga/effects";
import { expectSaga } from "redux-saga-test-plan";
import { throwError } from "redux-saga-test-plan/providers";

import * as types from "./authActionsTypes";
import authReducer, { initialState } from "./authReducer";
import auth from "../../api/auth";
import authSagas from "./authSagas";
import { loginRequest } from "./authActions";


describe("Redux: Auth", () => {
  it("log in the user with success", () => {
    const response = { token: "tokentoken" };
    const fakeData = { email: "admin@coaxsoft.com", password: "qwerty" };

    return expectSaga(authSagas)
      .withReducer(authReducer)

      // Test Saga
      .put({ type: types.SHOW_LOADING })
      .provide([
        [call(auth.login, fakeData), response],
      ])
      .put({ type: types.LOGIN_REQUEST_SUCCESS, response })
      .put({ type: types.HIDE_LOADING })

      // Test reducer
      .hasFinalState({
        ...initialState,
        isAuthenticated: true,
        processing: false,
        token: "tokentoken",
        error: "",
      })
      .dispatch(loginRequest(fakeData))
      .silentRun();
  });

  it("log in the user with error", () => {
    const response = Error("Unauthorized, something is wrong");
    const fakeData = { email: "admin@coaxsoft.com", password: "qwerty" };

    return expectSaga(authSagas)
      .withReducer(authReducer)

      // Test Saga
      .put({ type: types.SHOW_LOADING })
      .provide([
        [call(auth.login, fakeData), throwError(response)],
      ])
      .put({ type: types.LOGIN_REQUEST_ERROR, error: response.message })
      .put({ type: types.HIDE_LOADING })

      // Test reducer
      .hasFinalState({
        ...initialState,
        isAuthenticated: false,
        processing: false,
        token: "",
        error: response.message,
      })
      .dispatch(loginRequest(fakeData))
      .silentRun();
  });
});


describe("Redux: Auth. Action Creators", () => {
  it("should clear error", () => {
    const expectedError = "error";
    const copyInitialState = { ...initialState, error: expectedError };

    expect(authReducer(undefined, {})).toEqual(initialState);
    expect(authReducer(undefined, { type: types.LOGIN_REQUEST_ERROR, error: expectedError })).toEqual(copyInitialState);
  })
});
