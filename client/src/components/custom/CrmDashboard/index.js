import React, { Component } from 'react'
import axios from 'axios';
import {connect} from 'react-redux'

import Tables from './Tables'
import Properties from './Properties'
import ChatManager from '../Chat/ChatManager'
import {SET_INQUIRIES} from '../../../actions/type'


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
      const data = {
        upcoming: [],
        engaged: [],
        cold: [],
        scheduled: [],
        toured: [],
        application: [],
        new: [],
      }
      res.data.forEach((lead) => {
        properties.add(lead.listing)
        data[lead.status.currentStatus].push(lead)
      })

      console.log(data)
      this.props.setInquiries(data)
      this.setState({data, properties: [...properties]})
    })
  }
  render() {
    return (
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-9 col-sm-12' >
            {this.props.data &&
              <Tables propertiesFilter={this.state.propertiesFilter} data={this.props.data}/>
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

const mapStateToProps = state => ({
  data: state.dashboard.inquiries
})
const mapDispatchToProps = dispatch => {
  return {
    setInquiries:(inquiries) => dispatch({type: SET_INQUIRIES, payload: inquiries})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CrmDashboard)

