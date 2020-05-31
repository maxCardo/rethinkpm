import React, { Component } from 'react'
import Pill from './Pill'

export class FilterPills extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPills: true
    }
  }
  render() {
    return (
      <div className='filter-pills__container'>
        <div className='filter-pills__title-container'>
          <p>Filters:</p> <button onClick={() => this.setState((prevState) => ({showPills: !prevState.showPills}))}>{this.state.showPills ? 'Hide' : 'Show'}</button>
        </div>
        {this.state.showPills ? 
          <div className='filter-pills__pills-container'>
            {this.props.filters.map((filter, index) => (
                <Pill key={index} text={`${filter.field} ${filter.filterType} ${this.representValue(filter.value)}`} />
            ))}
          </div>
          :
          ''
        }
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
