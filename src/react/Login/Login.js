import React, { useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useForm } from "react-hook-form";

import { loginRequest, clearErrorAction } from "../../redux/auth/authActions";


export const Login = () => {
  const { error, isProcessing } = useSelector(state => ({
    error: state.auth.error, isProcessing: state.auth.processing
  }), shallowEqual);
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();

  // Clear error on unmount
  useEffect(() => dispatch(clearErrorAction()), []);


  // Methods
  const onSubmit = values => {
    dispatch(loginRequest(values))
  }


  // Render
  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
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

export default Login;
