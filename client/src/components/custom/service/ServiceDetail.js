import React, { Component } from 'react'
import ActionBar from './ActionBar'
import DetailsBar from './DetailsBar'
import ChildTasks from './ChildTasks'

export class ServiceDetail extends Component {
  render() {
    const agentContact = {
      phone: '12345678',
      email: 'lagartoverde97@gmail.com'
    }
    const task = {
      parentId: 123,
      opened: new Date(),
      taskId: 456,
      status: 'In progress',
      nextDate: new Date(),
      vendor: 'WallsSmith',
      child: [
        {
          id: 345,
          status: 'completed',
          issue: 'Construct wall'
        },
        {
          id: 897,
          status: 'ready to start',
          issue: 'Paint wall'
        }

      ]
    }
    return (
      <div className='service-detail__service-container'>
        <div className='service-detail__action-bar'>
          <ActionBar name='Oscar Rodriguez' title="MyCompany's CEO" contact={agentContact}/>
        </div>
        <div className='service-detail__detail-bar'>
          <DetailsBar task={task}/>
        </div>
        <div className='service-detail__main-container'>
          <div className='service-detail__child-tasks-container'>
            <ChildTasks tasks={task.child} />
          </div>
          <div className='service-detail__data-container'>

          </div>
        </div>
      </div>
    )
  }
}

export default ServiceDetail
