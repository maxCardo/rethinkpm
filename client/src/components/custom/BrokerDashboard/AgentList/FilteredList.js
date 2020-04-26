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
      const field = FilteredList.getData(item, filter.field)
      const filterFunction = filterFunctions[filter.filterType]
      return filterFunction(field, filter.value)
    })
    return filteredData
  }
  static getData(dataItem, field) {
    if (field.includes('.')) {
      const fieldsArray = field.split('.')
      let item = dataItem;
      fieldsArray.forEach((field) => {
        if (item) {
          item = item[field]
        }
      })
      return item
    } else {
      return dataItem[field]
    }
  }
  render() {
    console.log(this.state.filteredData)
    return (
      <InfiniteList data={this.state.filteredData} dataSetKey={this.props.dataSetKey}/>
    )
  }
}

export default FilteredList
