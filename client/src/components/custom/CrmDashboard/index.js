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
      data: undefined,
      propertiesOpen: false
    }
    this.onChangePropertiesFilter = this.onChangePropertiesFilter.bind(this)
    this.toggleProperties = this.toggleProperties.bind(this)
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

      this.props.setInquiries({inquiries: data, inquiriesRaw: res.data})
      this.setState({data, properties: [...properties], })
    })
    
  }
  render() {
    return (
      <div className='container-fluid'>
        <div className='row'>
          <div className={`${this.state.propertiesOpen ? 'col-md-9' : 'col-md-11'} col-sm-12`} >
            {this.props.data &&
              <Tables propertiesFilter={this.state.propertiesFilter} data={this.props.data}/>
            }
          </div>
          <div className={`${this.state.propertiesOpen ? 'col-md-3' : 'col-md-1'} col-sm-12`}>
            {this.state.properties &&
              <Properties 
                onChangePropertiesFilter={this.onChangePropertiesFilter}
                properties={this.state.properties}
                toggleOpen={this.toggleProperties}
                open={this.state.propertiesOpen}
              />
            }
          </div>
        </div>
        <ChatManager />
      </div>
    )
  }
  toggleProperties() {
    this.setState((prevState) => ({propertiesOpen: !prevState.propertiesOpen}))
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

