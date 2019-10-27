import React, { Component } from 'react'
import {data} from './mockData'
import Table from '../Table'
import './CrmDashboard.css'

export class Tables extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filterString: '',
      headers: [
        {
          accessor: 'lead_name',
          label: 'Lead Name'
        },
        {
          accessor: 'property',
          label: 'Property'
        },
        {
          accessor: 'phone',
          label: 'Phone'
        },
        {
          accessor: 'last_contact',
          label: 'Last Contact'
        },
      ]
    }
  }
  render() {
    return (
      <div>
        <div className='searchContainer'>
          <input className='form-control searchInput' onChange={(e) => this.setState({filterString: e.target.value})} placeholder='Search'></input>
        </div>
        <div className='section'>
          <h2 className='sectionTitle'>Status 1: Upcoming Appointments</h2>
          <Table 
            headers={this.state.headers} 
            data={data['upcoming']} 
            pageSize={5} 
            sorting={true} 
            filter={this.state.filterString} 
            fontSize={14}
          />
        </div>
        <div>
          <h2 className='sectionTitle'>Status 2: Sourced</h2>
          <Table 
            headers={this.state.headers} 
            data={data['sourced']} 
            pageSize={5} 
            sorting={true} 
            filter={this.state.filterString}  
            fontSize={14}
          />
        </div>
        <div>
          <h2 className='sectionTitle'>Status 3: Engaged = Hot</h2>
          <Table 
            headers={this.state.headers} 
            data={data['engaged']} 
            pageSize={5} 
            sorting={true} 
            filter={this.state.filterString}  
            fontSize={14}
          />
        </div>
        <div>
          <h2 className='sectionTitle'>Status 4: Cold</h2>
          <Table 
            headers={this.state.headers} 
            data={data['cold']} 
            pageSize={5} 
            sorting={true} 
            filter={this.state.filterString}
            fontSize={14}
          />
        </div>
      </div>
    )
  }
}

export default Tables

