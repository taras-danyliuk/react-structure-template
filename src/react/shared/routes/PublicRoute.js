import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";


function PublicRoute({ component: Component, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => {
        const { from } = location.state || { from: { pathname: "/" } };

        if (isAuthenticated) return <Redirect to={from}/>;

        return <Component {...props} />
      }}
    />
  );
}

PublicRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
};

export default connect(
  state => ({ isAuthenticated: state.auth.isAuthenticated })
)(PublicRoute);
