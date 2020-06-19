import React, { Component } from 'react'
import SelectTableView from './SelectTableView'
import SeparatedTableView from './SeparatedTableView'
import TabbedTableView from './TabbedTableView'

export class TableView extends Component {
  render() {
    switch(this.props.type) {
      case "select":
        return <SelectTableView {...this.props}/>
      case "separated":
        return <SeparatedTableView {...this.props} />
      case "tabbed":
        return <TabbedTableView {...this.props} />
      default:
        console.error(`The TableView type ${this.props.type} is not yet implemented`)
        return <p>TableView {this.props.type} not implemented yet</p>
    }
  }
}

export default TableView
