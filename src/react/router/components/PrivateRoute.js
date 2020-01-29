import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";


function PrivateRoute({ component: Component, isAuthenticated, location, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => {
        if (!isAuthenticated) return <Redirect to={{ pathname: "/auth", state: { from: location } }}/>;

        return <Component {...props} />
      }}
    />
  );
}

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
};

export default connect(
  state => ({ isAuthenticated: state.auth.isAuthenticated })
)(PrivateRoute);
