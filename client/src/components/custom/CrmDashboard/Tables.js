import React, { Component } from 'react'
import {data} from './mockData'
import Table from '../Table'
import './CrmDashboard.css'

export class Tables extends Component {
  constructor(props) {
    super(props)
    console.log(data)
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
      ],
      filteredData: data
    }
  }
  static getDerivedStateFromProps(props, state) {
    console.log('Enters')
    const filteredData = {}
    console.log(data)
    for(let status in data) {
      console.log(status)
      const filteredStatus = data[status].filter((elem) => {
        return props.propertiesFilter.includes(elem.property)
      })
      console.log(filteredStatus)
      filteredData[status] = filteredStatus
    }
    console.log(filteredData)
    return {
      filteredData,
      propertiesFilter: props.propertiesFilter
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
            data={this.state.filteredData['upcoming']} 
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
            data={this.state.filteredData['sourced']} 
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
            data={this.state.filteredData['engaged']} 
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
            data={this.state.filteredData['cold']} 
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

