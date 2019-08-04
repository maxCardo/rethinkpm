import React, {Fragment} from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Widgit from './Widget';

const Dashboard = ({auth:{user}}) => {
    return (
      <Fragment>
        <h2>Hello {user && user.name}! </h2>

        <div className = "dashboard">
          <Widgit/>
          <Widgit/>
          <Widgit/>  
        </div>
      </Fragment>
    )
}

Dashboard.propTypes = {
  auth: PropTypes.object,
}

const mapStateToProps = state => ({
  auth: state.auth 
})

export default connect(mapStateToProps)(Dashboard)
