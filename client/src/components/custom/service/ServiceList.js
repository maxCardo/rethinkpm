import React, { Component } from 'react'
import {Link, withRouter} from 'react-router-dom';
import Table from '../Table'
import {ButtonGroup} from 'react-bootstrap'
import {connect} from 'react-redux'
import './style.css'

export class ServiceList extends Component {
  constructor(props) {
    super(props)
    this.headers = [
      {
        accessor: 'type',
        label: 'Type',
      },
      {
        accessor: 'opened',
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
        mapper: (data) => data ? new Intl.DateTimeFormat().format(new Date(data))  : 'Not Closed yet' 
      },
      {
        reactComponent: true,
        label: 'Actions',
        sortable: false,
        render: (row) =>
        <div>
          <div>
            <Link className='service__action-button' to={`/services/${row._id}`}>
              <i className="fas fa-ellipsis-h"></i>
            </Link>
          </div>
        </div>
      },
    ]
    this.state = {
      filterString: '',
      data: this.props.services,
      activeData: 'all'
    }
    this.changeActiveData = this.changeActiveData.bind(this)
  }
  render() {
    return (
      <div style={{padding: '2rem 1rem'}}>
        <div className='service-list__button-group'>
          <ButtonGroup>
            <button className={`btn btn-success ${this.state.activeData !== 'all' ? 'inactive' : ''}`} onClick={() => this.changeActiveData('all')}>All</button>
            <button className={`btn btn-warning ${this.state.activeData !== 'jobs' ? 'inactive' : ''}`} onClick={() => this.changeActiveData('jobs')}>Jobs</button>
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
          onClickRow={(row) => this.props.history.push(`/services/${row._id}`)}
        />
      </div>
    )
  }
  changeActiveData(activeData) {
    let data = this.props.services
    if(activeData === 'jobs') {
      data = data.filter((service) => !service.parent)
    } else if(activeData === 'tasks') {
      data = data.filter((service) => service.parent)
    }
    this.setState({
      activeData,
      data,
    })
  }
}

const mapStateToProps = state => ({
  services: Object.values(state.services.services)
})

const mapDispatchToProps = dispatch => {
  return {
    
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ServiceList))
