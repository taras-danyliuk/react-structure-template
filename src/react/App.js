import React from "react";

import Modal from "./shared/Modal/Modal";
import AppRoutes from "./router/AppRoutes";


function App() {
  return (
    <React.Fragment>
      <AppRoutes/>
      <Modal/>
    </React.Fragment>
  );
}

export default App;
