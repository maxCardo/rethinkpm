import React, { Component } from 'react'
import Tables from './Tables'
import Properties from './Properties'

export class CrmDashboard extends Component {
  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-9 col-sm-12'>
            <Tables />
          </div>
          <div className='col-md-3 col-sm-12'>
            <Properties />
          </div>
        </div>
      </div>
    )
  }
}

export default CrmDashboard

