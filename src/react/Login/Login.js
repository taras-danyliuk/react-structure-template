import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";

import { loginRequest, clearErrorAction } from "../../redux/auth/authActions";


export const Login = ({ isProcessing, error, login, clearError }) => {
  const { register, handleSubmit, errors } = useForm();

  // Clear error on unmount
  useEffect(() => clearError, []);


  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit(login)} className="auth-form">
        <input
          name="email"
          ref={register({ required: "Field is required", pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })}
          type="email"
        />
        { errors.email && <span>{errors.email.message}</span>}

        <input
          name="password"
          ref={register({ required: "Field is required" })}
          type="password"
        />
        { errors.password && <span>{errors.password.message}</span>}

        <button type="submit" disabled={isProcessing}>Submit</button>
      </form>

      <p className="auth-form-error">{error && error.error}</p>
    </div>
  )
};

Login.propTypes = {
  isProcessing: PropTypes.bool.isRequired,
  error: PropTypes.object,
  login: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
};

export default connect(
  state => ({ isProcessing: state.auth.processing, error: state.auth.error }),
  { login: loginRequest, clearError: clearErrorAction }
)(Login);
