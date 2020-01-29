import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";

import { loginRequest } from "../../redux/auth/authActions";


const Login = ({ isProcessing, error, login }) => {
  const { register, handleSubmit, errors } = useForm({ defaultValues: { email: "", password: "" } });


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
