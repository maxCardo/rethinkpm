import React from 'react';
import { Route, Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {getCookie} from '../../../util/cookies'

const PrivateRoute = ({ component: Component, auth: { isAuthenticated, loading, loginInProgress }, ...rest }) => (
    <Route {...rest} render={(props) => renderFunction(Component, props, loginInProgress, isAuthenticated, loading)} />
)

const renderFunction = (Component, props, loginInProgress, isAuthenticated, loading) => {
  if(loginInProgress) {
    if(getCookie('sid')){
      return <Component {...props} />
    } else {
      return <NotAuthenticatedInfo />
    }
  }
  if(!isAuthenticated && !loading) {
    return <NotAuthenticatedInfo />
  } else {
    return <Component {...props} />
  }
}

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