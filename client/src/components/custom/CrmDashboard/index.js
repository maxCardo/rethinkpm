import React, { Component } from 'react'
import axios from 'axios';

import Tables from './Tables'
import Properties from './Properties'


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
      const properties = new Set()
      res.data.forEach((lead) => {
        properties.add(lead.listing)
      })
      const data = {
        upcoming: res.data,
        sourced: [],
        engaged: [],
        cold: []
      }
      this.setState({data, properties: [...properties]})
    })
  }
  render() {
    return (
      <div className='container'>
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
      </div>
    )
  }
  onChangePropertiesFilter(propertiesFilter) {
    this.setState({propertiesFilter: propertiesFilter.slice()})
  }
}

export default CrmDashboard

