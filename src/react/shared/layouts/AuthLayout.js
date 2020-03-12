import React from "react";
import PropTypes from "prop-types";

import Header from "../Header";


function AuthLayout({ children }) {
  return (
    <div>
      <Header/>

      {children }
    </div>
  )
}

AuthLayout.propTypes = {
  children: PropTypes.any,
};

export default AuthLayout;
