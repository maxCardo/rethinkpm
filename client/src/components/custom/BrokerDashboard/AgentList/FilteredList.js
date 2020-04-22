import React, { Component } from 'react'
import filterFunctions from './filters'
import InfiniteList from './InfiniteList'

export class FilteredList extends Component {
  static getDerivedStateFromProps(props, state) {
    let filteredData = props.data
    props.filters.forEach(filter => {
      filteredData = FilteredList.processFilter(filter, filteredData)
    });
    return {
      filteredData
    }
  }
  static processFilter(filter, data) {
    const filteredData = data.filter((item) => {
      const field = item[filter.field]
      const filterFunction = filterFunctions[filter.type]
      return filterFunction(field, filter.value)
    })
    return filteredData
  }
  render() {
    console.log(this.state.filteredData)
    return (
      <InfiniteList data={this.state.filteredData} />
    )
  }
}

export default FilteredList
