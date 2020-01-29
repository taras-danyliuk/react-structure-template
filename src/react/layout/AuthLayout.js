import React from "react";
import PropTypes from "prop-types";

import Header from "../shared/Header";


function AuthLayout({ children }) {
  return (
    <div>
      <div className="auth-content">
        <Header/>

        { children }
      </div>
    </div>
  )
}

AuthLayout.propTypes = {
  children: PropTypes.any,
};

export default AuthLayout;
