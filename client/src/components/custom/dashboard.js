import React from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types'

const dashboard = ({auth:{user}}) => {
    return (
        <div>
          <p>Hello {user && user.name}! </p>  
        </div>
    )
}

dashboard.propTypes = {
  auth: PropTypes.object,
}

const mapStateToProps = state => ({
  auth: state.auth 
})

export default connect(mapStateToProps)(dashboard)
