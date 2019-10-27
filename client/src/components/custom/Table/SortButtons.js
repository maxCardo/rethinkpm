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
      'notSorted': <SortIcon />,
      'asc': <SortUpIcon />,
      'desc': <SortDownIcon />
    }
    return (
      <span style={{height: 20, marginLeft: 10}} onClick={this.props.handleSort}>
        {sortIcons[this.props.sortDirection]}
      </span>
    )
  }
}

export default sortButtons
