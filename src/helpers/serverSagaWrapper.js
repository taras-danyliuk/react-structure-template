import { select, put } from "redux-saga/effects";

function serverSagaWrapper(saga) {
  return function *(params) {
    const shouldTrack = yield select(state => state.ssr.shouldTrack);

    // This is executed on client
    if (!shouldTrack) {
      yield saga(params);
    }
    // This is executed on server
    else {
      // Create promise
      let promiseResolve = null;
      const promise = new Promise(resolve => {
        promiseResolve = resolve
      });

      // Add to collection to be able to wait
      yield put({ type: "ADD_PROMISE", key: params.type, promise: promise })

      // Run passed saga
      yield saga(params);

      // Mark promise as resolved after saga is finished
      promiseResolve();
    }
  }
}

export default serverSagaWrapper;
