import React, { Component } from 'react'
import SelectDashboard from './SelectDashboard'
import SeparatedDashboard from './SeparatedDashboard'
import TabbedDashboard from './TabbedDashboard'

export class Dashboard extends Component {
  render() {
    switch(this.props.type) {
      case "select":
        return <SelectDashboard {...this.props}/>
      case "separated":
        return <SeparatedDashboard {...this.props} />
      case "tabbed":
        return <TabbedDashboard {...this.props} />
      default:
        console.error(`The dashboard type ${this.props.type} is not yet implemented`)
        return <p>Dashboard {this.props.type} not implemented yet</p>
    }
  }
}

export default Dashboard
