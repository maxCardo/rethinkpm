import React, { Component } from 'react'
import {SortIcon, SortUpIcon, SortDownIcon} from './icons'

export class sortButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortDirection: 'notSorted'
    }
  }
  render() {
    const sortIcons = {
      'notSorted': <SortIcon fontSize={this.props.fontSize}/>,
      'asc': <SortUpIcon fontSize={this.props.fontSize}/>,
      'desc': <SortDownIcon fontSize={this.props.fontSize}/>
    }
    const sortDirection = this.props.sortDirection ? this.props.sortDirection : 'notSorted'
    return (
      <span style={{height: 20, marginLeft: 10}} onClick={this.props.handleSort}>
        {sortIcons[sortDirection]}
      </span>
    )
  }
}

export default sortButtons
