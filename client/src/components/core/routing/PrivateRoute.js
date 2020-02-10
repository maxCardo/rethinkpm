import React from 'react';
import { Route, Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, auth: { isAuthenticated, loading }, ...rest }) => (
    <Route {...rest} render={props => !isAuthenticated && !loading ? (<NotAuthenticatedInfo />) : (<Component {...props} />)} />
)

const NotAuthenticatedInfo = () => (
  <p>You are not logged in, maybe you wanted to go to <Link to='/login'>Login</Link></p>
)

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute)