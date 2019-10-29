import React, { Component } from 'react'
import Tables from './Tables'
import Properties from './Properties'

export class CrmDashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      propertiesFilter: []
    }
    this.onChangePropertiesFilter = this.onChangePropertiesFilter.bind(this)
  }
  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-9 col-sm-12'>
            <Tables propertiesFilter={this.state.propertiesFilter}/>
          </div>
          <div className='col-md-3 col-sm-12'>
            <Properties onChangePropertiesFilter={this.onChangePropertiesFilter}/>
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

