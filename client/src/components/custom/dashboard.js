import React, {Fragment} from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Widgit from './dashboard/Widget';

const dashboard = ({auth:{user}}) => {
    return (
      <Fragment>
        <h1>Hello {user && user.name}! </h1>

        <div className = "dashboard">
          <Widgit/>
          <Widgit/>
          <Widgit/>  
        </div>
      </Fragment>
    )
}

dashboard.propTypes = {
  auth: PropTypes.object,
}

const mapStateToProps = state => ({
  auth: state.auth 
})

export default connect(mapStateToProps)(dashboard)
