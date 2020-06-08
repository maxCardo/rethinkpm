import React from 'react';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {getCookie} from '../../../util/cookies'

const PrivateRoute = ({ component: Component, auth: { isAuthenticated, loading, loginInProgress }, additionalProps, ...rest}) => (
    <Route {...rest} render={(props) => renderFunction(Component, props, loginInProgress, isAuthenticated, loading, additionalProps)} />
)

const renderFunction = (Component, props, loginInProgress, isAuthenticated, loading, additionalProps) => {
  if(loginInProgress) {
    if(getCookie('sid')){
      return <Component {...props} {...additionalProps} />
    } else {
      return <NotAuthenticatedInfo />
    }
  }
  if(!isAuthenticated && !loading) {
    return <NotAuthenticatedInfo />
  } else {
    return <Component {...props} {...additionalProps} />
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