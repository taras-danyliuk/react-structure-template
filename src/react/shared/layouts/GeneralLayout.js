import React from "react";
import PropTypes from "prop-types";

import Header from "../Header/Header";


function GeneralLayout({ children }) {
  return (
    <div>
      <Header/>

      {children}
    </div>
  )
}

GeneralLayout.propTypes = {
  children: PropTypes.any,
};

export default GeneralLayout;
