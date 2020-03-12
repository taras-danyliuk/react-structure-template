/* eslint no-undefined: 0 */

import { call } from "redux-saga/effects";
import { expectSaga } from "redux-saga-test-plan";
import { throwError } from "redux-saga-test-plan/providers";
import faker from "faker";

import * as types from "./authActionsTypes";
import authReducer, { initialState } from "./authReducer";
import auth from "../../api/auth";
import authSagas from "./authSagas";
import { loginRequest, registerRequest, logoutRequest, clearErrorAction } from "./authActions";


describe("Redux: Auth", () => {
  it("log in user with success", () => {
    const response = { token: faker.random.word() };
    const fakeData = { email: faker.internet.email(), password: faker.internet.password() };

    return expectSaga(authSagas)
      .withReducer(authReducer)
      .dispatch(loginRequest(fakeData))

      // Test Saga
      .put({ type: types.TOGGLE_PROCESSING, payload: true })
      .provide([
        [call(auth.login, fakeData), response],
      ])
      .put({ type: types.LOGIN_REQUEST_SUCCESS, payload: response })
      .put({ type: types.TOGGLE_PROCESSING, payload: false })

      // Test reducer
      .hasFinalState({
        ...initialState,
        isAuthenticated: true,
        role: "User",
        processing: false,
      })
      .silentRun();
  });

  it("log in user with error", () => {
    const response = { error: faker.random.words() };
    const fakeData = { email: faker.internet.email(), password: faker.internet.password() };

    return expectSaga(authSagas)
      .withReducer(authReducer)
      .dispatch(loginRequest(fakeData))

      // Test Saga
      .put({ type: types.TOGGLE_PROCESSING, payload: true })
      .provide([
        [call(auth.login, fakeData), throwError(response)],
      ])
      .put({ type: types.AUTH_REQUEST_ERROR, error: response })
      .put({ type: types.TOGGLE_PROCESSING, payload: false })

      // Test reducer
      .hasFinalState({
        ...initialState,
        isAuthenticated: false,
        processing: false,
        error: response,
      })
      .silentRun();
  });

  it("register user with success", () => {
    const response = { token: faker.random.word(), id: faker.random.number(100) };
    const fakeData = { email: faker.internet.email(), password: faker.internet.password() };

    return expectSaga(authSagas)
      .withReducer(authReducer)
      .dispatch(registerRequest(fakeData))

      // Test Saga
      .put({ type: types.TOGGLE_PROCESSING, payload: true })
      .provide([
        [call(auth.register, fakeData), response],
      ])
      .put({ type: types.REGISTER_REQUEST_SUCCESS, payload: response })
      .put({ type: types.TOGGLE_PROCESSING, payload: false })

      // Test reducer
      .hasFinalState({
        ...initialState,
        isAuthenticated: true,
        userId: response.id,
        processing: false,
      })
      .silentRun();
  });

  it("register user with error", () => {
    const response = { error: faker.random.words() };
    const fakeData = { email: faker.internet.email(), password: faker.internet.password() };

    return expectSaga(authSagas)
      .withReducer(authReducer)
      .dispatch(registerRequest(fakeData))

      // Test Saga
      .put({ type: types.TOGGLE_PROCESSING, payload: true })
      .provide([
        [call(auth.register, fakeData), throwError(response)],
      ])
      .put({ type: types.AUTH_REQUEST_ERROR, error: response })
      .put({ type: types.TOGGLE_PROCESSING, payload: false })

      // Test reducer
      .hasFinalState({
        ...initialState,
        isAuthenticated: false,
        processing: false,
        error: response,
      })
      .silentRun();
  });

  it("log out user with success", () => {
    const response = true;

    return expectSaga(authSagas)
      .withReducer(authReducer)
      .dispatch(logoutRequest())

      // Test Saga
      .put({ type: types.TOGGLE_PROCESSING, payload: true })
      .provide([
        [call(auth.logout), response],
      ])
      .put({ type: types.LOGOUT_REQUEST_SUCCESS, payload: response })
      .put({ type: types.TOGGLE_PROCESSING, payload: false })

      // Test reducer
      .hasFinalState({
        ...initialState,
        isAuthenticated: false,
        processing: false,
      })
      .silentRun();
  });

  it("log out user with error", () => {
    const logOutResponse = { error: faker.random.words() };

    return expectSaga(authSagas)
      .withReducer(authReducer)
      .dispatch({ type: types.LOGIN_REQUEST_SUCCESS, payload: true })
      .dispatch(logoutRequest())

      // Test Saga
      .put({ type: types.TOGGLE_PROCESSING, payload: true })
      .provide([
        [call(auth.logout), throwError(logOutResponse)],
      ])
      .put({ type: types.AUTH_REQUEST_ERROR, error: logOutResponse })
      .put({ type: types.TOGGLE_PROCESSING, payload: false })

      // Test reducer
      .hasFinalState({
        ...initialState,
        isAuthenticated: true,
        role: "User",
        processing: false,
        error: logOutResponse,
      })
      .silentRun();
  });
});


describe("Redux: Auth. Action Creators", () => {
  it("should clear error", () => {
    const expectedError = { error: faker.random.words() };
    const stateWithError = { ...initialState, error: expectedError };

    const errorAction = { type: types.AUTH_REQUEST_ERROR, error: expectedError };

    expect(authReducer(undefined, {})).toEqual(initialState);
    expect(authReducer(undefined, errorAction)).toEqual(stateWithError);
    expect(authReducer(undefined, clearErrorAction())).toEqual(initialState);
  })
});
