import React from "react";
import { shallow } from "enzyme";
import faker from "faker";

import { Login } from "./Login";


it("Login: renders without crashing", () => {
  const props = { isProcessing: false, error: null, login: jest.fn(), clearError: jest.fn() };
  const component = shallow(<Login {...props}/>);

  expect(component.length).toBe(1);
});

it("Login: submit button is disabled if isProcessing", () => {
  const props = { isProcessing: true, error: null, login: jest.fn(), clearError: jest.fn() };
  const component = shallow(<Login {...props}/>);
  const submitButton = component.find("button[type='submit']");

  expect(submitButton.prop("disabled")).toBe(true);
});

it("Login: server error is rendered", () => {
  const props = { isProcessing: true, error: { error: faker.random.word() }, login: jest.fn(), clearError: jest.fn() };
  const component = shallow(<Login {...props}/>);
  const errorTag = component.find(".auth-form-error");

  expect(errorTag.text()).toBe(props.error.error);
});
