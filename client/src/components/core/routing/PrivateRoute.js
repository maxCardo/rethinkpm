import React from "react";
import { Navigate, Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCookie } from "../../../util/cookies";

const PrivateRoute = ({
  children,
  auth: { isAuthenticated, loading, loginInProgress },
  additionalProps,
}) => {
  if (loginInProgress) {
    if (getCookie("sid")) {
      return React.cloneElement(children, { ...additionalProps });
    } else {
      return <NotAuthenticatedInfo />;
    }
  }

  if (!isAuthenticated && !loading) {
    return <NotAuthenticatedInfo />;
  }

  return React.cloneElement(children, { ...additionalProps });
};

const NotAuthenticatedInfo = () => (
  <p>
    <Link to="/login">Login</Link>
  </p>
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  additionalProps: PropTypes.object,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
