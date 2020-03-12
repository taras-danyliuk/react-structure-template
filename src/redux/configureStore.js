/* istanbul ignore file */

import { applyMiddleware, compose, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga"


export default function configureStore(preloadedState) {
  const sagaMiddleware = createSagaMiddleware();

  // Combine all middlewares into single enhancer
  const middlewares = [sagaMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  // Compose all enhancer into single function
  const enhancers = [middlewareEnhancer];
  const composeFunction = process.env.NODE_ENV !== "production" ? composeWithDevTools : compose;
  const composedEnhancers = composeFunction(...enhancers);

  // Create store with preloaded state and enhancers
  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  // Run all sagas
  sagaMiddleware.run(rootSaga);

  return store;
}
