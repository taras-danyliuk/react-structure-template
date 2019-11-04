import React from "react";
import PropTypes from "prop-types";

import Header from "../shared/Header";


function UserLayout({ children }) {
  return (
    <div>
      <div className="user-content">
        <Header/>

        { children }
      </div>
    </div>
  )
}

UserLayout.propTypes = {
  children: PropTypes.any,
};

export default UserLayout;
