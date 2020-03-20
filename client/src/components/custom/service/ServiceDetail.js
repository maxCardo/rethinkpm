import React, { Component } from 'react'
import ActionBar from './ActionBar'
import DetailsBar from './DetailsBar'
import ChildTasks from './ChildTasks'
import BottomNavigation from './BottomNavigation'
import TicketScreen from './detailsScreens/TicketScreen'
import HistoryScreen from './detailsScreens/HistoryScreen'
import CommunicationScreen from './detailsScreens/CommunicationScreen'
import BillingScreen from './detailsScreens/BillingScreen'
import VendorScreen from './detailsScreens/VendorScreen'

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
      issue: 'Renovate the main front wall of the house',
      description: 'We have to renovate the front wall of the house, because it has several water damage, for this we will have to construct a new wall, with the same materials found in the rest of the construction and then paint it accordingly to the rest of the house. This is estimated to take 4 weeks, because it was constructed with an special material hard to find, and also we will face a period when usually the majority of the vendors are very busy. Once we finish with this task we will be ready for renting the unit. WallsSmith is on charge of the whole project and made an estimate budget of 10.000$. This will also increase the property value from 90.000$ to 110.000$ because it will make the unit attractive to new owners, and will allow us to increase the rent. The agent Oscar will supervise the whole operation and inform Adam when necesary',
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
    const screens = [
      {
        route: 'ticket',
        display: 'Ticket',
        component: <TicketScreen task={task} />,
      },
      {
        route: 'history',
        display: 'History',
        component: <HistoryScreen />
      },
      {
        route: 'communication',
        display: 'Communication',
        component: <CommunicationScreen />
      },
      {
        route: 'billing',
        display: 'Billing',
        component: <BillingScreen />
      },
      {
        route: 'vendor',
        display: 'Vendor',
        component: <VendorScreen />
      },
    ]
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
            <BottomNavigation screens={screens} />
          </div>
        </div>
      </div>
    )
  }
}

export default ServiceDetail
