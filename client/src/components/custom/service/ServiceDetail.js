import React, { Component } from 'react'
import ActionBar from './ActionBar'

export class ServiceDetail extends Component {
  render() {
    const agentContact = {
      phone: '12345678',
      email: 'lagartoverde97@gmail.com'
    }
    return (
      <div className='service-detail__service-container'>
        <div className='service-detail__action-bar'>
          <ActionBar name='Oscar Rodriguez' title="MyCompany's CEO" contact={agentContact}/>
        </div>
        <div className='service-detail__detail-bar'>

        </div>
        <div className='service-detail__main-container'>
          <div className='service-detail__child-tasks-container'>

          </div>
          <div className='service-detail__data-container'>

          </div>
        </div>
      </div>
    )
  }
}

export default ServiceDetail
