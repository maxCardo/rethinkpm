import React, { Component } from 'react'

export class FilterPills extends Component {
  render() {
    return (
      <div className='filter-pills__container'>
        {this.props.filters.map((filter) => (
            <div className='filter-pills__pill'>
              {filter.field} {filter.filterType} {this.representValue(filter.value)}
            </div>
        ))}
      </div>
    )
  }
  representValue(value) {
    if(value.constructor === Array) {
      return `[${value.join(', ')}]`
    }
    return value
  }
}

export default FilterPills
