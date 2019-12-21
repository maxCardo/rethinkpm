import React, { Component } from 'react'
import axios from 'axios';

import Tables from './Tables'
import Properties from './Properties'
import ChatManager from '../Chat/ChatManager'


export class CrmDashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      propertiesFilter: [],
      data: undefined
    }
    this.onChangePropertiesFilter = this.onChangePropertiesFilter.bind(this)
  }
  componentDidMount() {
    axios.get('/api/rent_lead/open_leads').then((res) => {
      console.log(res)
      const properties = new Set()
      const data = {
        upcoming: [],
        sourced: [],
        engaged: [],
        cold: [],
        scheduled: [],
        toured: [],
        application: [],
        new: [],
      }
      res.data.forEach((lead) => {
        properties.add(lead.listing)
        console.log(lead.status.currentStatus)
        data[lead.status.currentStatus].push(lead)
      })

      
      this.setState({data, properties: [...properties]})
    })
  }
  render() {
    return (
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-9 col-sm-12'>
            {this.state.data &&
              <Tables propertiesFilter={this.state.propertiesFilter} data={this.state.data}/>
            }
          </div>
          <div className='col-md-3 col-sm-12'>
            {this.state.properties &&
              <Properties 
                onChangePropertiesFilter={this.onChangePropertiesFilter}
                properties={this.state.properties}
              />
            }
          </div>
        </div>
        <ChatManager />
      </div>
    )
  }
  onChangePropertiesFilter(propertiesFilter) {
    this.setState({propertiesFilter: propertiesFilter.slice()})
  }
}

export default CrmDashboard

