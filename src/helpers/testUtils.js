import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
// import { useForm, FormProvider } from "react-hook-form";
// import { SWRConfig } from "swr";
// import { setupServer } from "msw/node";
import { createMemoryHistory } from "history";

import configureStore from "../redux/configureStore";
// import mswHandlers from "src/helpers/mswHandlers";
// import { swrFetcher } from "../api";


// Render with router and redux
function render(
  ui,
  {
    initialState = {},
    store = configureStore(initialState),
    ...renderOptions
  } = {}
) {
  const history = createMemoryHistory();
  const Wrapper = ({ children }) => {
    return (
      <Provider store={store}>
        <Router history={history}>
          {children}
        </Router>
      </Provider>
    );
  }

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from "@testing-library/react";

// override render method
export { render };
