import React, { Component } from 'react'
import SortButtons from './SortButtons'

export class Header extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this)
  }
  render() {
    return (
      <th onClick={this.handleClick} className={this.props.className}>
        <div 
          style={{display: 'flex', alignItems: 'center', cursor: this.props.sortable ? 'pointer': ''}}
        >
          {this.props.label}

          {this.props.sortable && 
            <SortButtons sortDirection={this.props.sortDirection} fontSize={this.props.fontSize}/>
          }
        </div>
      </th>
    )
  }
  handleClick() {
    if(this.props.sortable) {
      this.props.handleSort()
    }
  }
}

export default Header
