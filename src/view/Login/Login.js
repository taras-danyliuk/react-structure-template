import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import { loginRequest } from "../../redux/auth/authActions";


const Login = ({ isProcessing, error, login }) => {
  const validate = values => {
    const errors = {};

    if (!values.email) errors.email = "Required";
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) errors.email = "Invalid email address";

    if (!values.password) errors.password = "Cannot be empty";

    return errors;
  };


  return (
    <div>
      <h1>Login</h1>

      <Formik
        initialValues={{ email: "eve.holt@reqres.inn", password: "cityslicka" }}
        validate={validate}
        onSubmit={login}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {() => (
          <Form className="auth-form">
            <Field type="email" name="email"/>
            <ErrorMessage name="email" component="div"/>

            <Field type="password" name="password"/>
            <ErrorMessage name="password" component="div"/>

            <button type="submit" disabled={isProcessing}>Submit</button>
          </Form>
        )}
      </Formik>

      <p>{error}</p>
    </div>
  )
};

Login.propTypes = {
  isProcessing: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default connect(
  state => ({ isProcessing: state.auth.processing, error: state.auth.error }),
  dispatch => ({ login: bindActionCreators(loginRequest, dispatch) })
)(Login);
