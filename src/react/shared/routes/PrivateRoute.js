import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";


function PrivateRoute({ component: Component, isAuthenticated, role, roles, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => {
        if (!isAuthenticated) return <Redirect to={{ pathname: "/login", state: { from: props.location } }}/>;
        if (roles && roles.length && !roles.includes(role)) {
          return <Redirect to={{ pathname: "/" }}/>;
        }

        return <Component {...props} />
      }}
    />
  );
}

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  role: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  roles: PropTypes.array
};

export default connect(
  state => ({ isAuthenticated: state.auth.isAuthenticated, role: state.auth.role })
)(PrivateRoute);
