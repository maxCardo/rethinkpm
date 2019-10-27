import React, { Component } from 'react'
import {data} from './mockData'
import Table from '../Table'

export class CrmDashboard extends Component {
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
          accessor: 'last_contact',
          label: 'Last Contact'
        },
      ]
    }
  }
  render() {
    return (
      <div>
        <input onChange={(e) => this.setState({filterString: e.target.value})} placeholder='Search'></input>
        <div>
          <h2>Status 1: Upcoming Appointments</h2>
          <Table headers={this.state.headers} data={data['upcoming']} pageSize={5} sorting={true} filter={this.state.filterString} />
        </div>
        <div>
          <h2>Status 2: Sourced</h2>
          <Table headers={this.state.headers} data={data['sourced']} pageSize={5} sorting={true} filter={this.state.filterString}  />
        </div>
        <div>
          <h2>Status 3: Engaged = Hot</h2>
          <Table headers={this.state.headers} data={data['engaged']} pageSize={5} sorting={true} filter={this.state.filterString}  />
        </div>
        <div>
          <h2>Status 4: Cold</h2>
          <Table headers={this.state.headers} data={data['cold']} pageSize={5} sorting={true} filter={this.state.filterString}  />
        </div>
        <button onClick={() => {
          this.setState({
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
          })
        }}>Show more data</button>
      </div>
    )
  }
}

export default CrmDashboard

