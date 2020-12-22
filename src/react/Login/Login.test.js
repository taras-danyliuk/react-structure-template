import React from "react";
import { render } from "../../helpers/testUtils";
import { Login } from "./Login";


it("Login: renders without crashing", () => {
  render(<Login/>)
});
