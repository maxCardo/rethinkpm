import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types'
import Table from '../Table'
import {ButtonGroup, Button} from 'react-bootstrap'
import './style.css'

export default class ServiceList extends Component {
  constructor(props) {
    super(props)
    this.headers = [
      {
        accessor: 'type',
        label: 'Type',
      },
      {
        accessor: 'created',
        label: 'Created Date',
        mapper: (data) => new Intl.DateTimeFormat().format(new Date(data))
      },
      {
        accessor: 'madeBy',
        label: 'Request Made By',
      },
      {
        accessor: 'serviceType',
        label: 'Service Type'
      },
      {
        accessor: 'status',
        label: 'Status'
      },
      {
        accessor: 'statusDate',
        label: 'Status Date',
        mapper: (data) => new Intl.DateTimeFormat().format(new Date(data))
      },
      {
        accessor: 'closed',
        label: 'Closed',
        mapper: (data) => data ? 'Not Closed yet' : new Intl.DateTimeFormat().format(new Date(data)) 
      },
      {
        reactComponent: true,
        label: 'Actions',
        sortable: false,
        render: (row) =>
        <div>
          <div>
            <Link className='service__action-button' to={`/service/${row._id}`}>
              <i class="fas fa-ellipsis-h"></i>
            </Link>
          </div>
        </div>
      },
    ]
    this.services = [
      {
        created: new Date(),
        unit: '1214 Wynne Ave',
        madeBy: 'Bob',
        serviceType: 'General Maintenance',
        status: 'requested',
        statusDate: new Date(),
        closed: undefined,
        type: 'service'
      },
    ]
    this.tasks = [
      {
        created: new Date(),
        unit: '1214 Wynne Ave',
        madeBy: 'Bob',
        serviceType: 'General Maintenance',
        status: 'requested',
        statusDate: new Date(),
        closed: undefined,
        type:'task'
      },
      {
        created: new Date(),
        unit: '1214 Wynne Ave',
        madeBy: 'Bob',
        serviceType: 'General Maintenance',
        status: 'requested',
        statusDate: new Date(),
        closed: undefined,
        type:'task'
      },
      {
        created: new Date(),
        unit: '1214 Wynne Ave',
        madeBy: 'Bob',
        serviceType: 'General Maintenance',
        status: 'requested',
        statusDate: new Date(),
        closed: undefined,
        type:'task'
      },
    ]
    this.servicesAndTasks = this.services.concat(this.tasks)
    this.data = {
      all: this.servicesAndTasks,
      services: this.services,
      tasks: this.tasks
    }
    this.state = {
      filterString: '',
      data: this.servicesAndTasks,
      activeData: 'all'
    }
    this.changeActiveData = this.changeActiveData.bind(this)
  }
  render() {
    return (
      <div>
        <div className='service-list__button-group'>
          <ButtonGroup>
            <button className={`btn btn-success ${this.state.activeData !== 'all' ? 'inactive' : ''}`} onClick={() => this.changeActiveData('all')}>All</button>
            <button className={`btn btn-warning ${this.state.activeData !== 'services' ? 'inactive' : ''}`} onClick={() => this.changeActiveData('services')}>Services</button>
            <button className={`btn btn-danger ${this.state.activeData !== 'tasks' ? 'inactive' : ''}`} onClick={() => this.changeActiveData('tasks')}>Tasks</button>
          </ButtonGroup>
        </div>
        <div className='searchContainer'>
          <input className='form-control searchInput' tabIndex={0} onChange={(e) => this.setState({filterString: e.target.value})} placeholder='Search'></input>
        </div>
        <Table 
          data={this.state.data} 
          headers={this.headers} 
          sorting={true}
          fontSize={12}
          pageSize={20}
          filter={this.state.filterString}
        />
      </div>
    )
  }
  changeActiveData(activeData) {
    console.log(activeData)
    this.setState({
      activeData,
      data: this.data[activeData]
    })
  }
}
