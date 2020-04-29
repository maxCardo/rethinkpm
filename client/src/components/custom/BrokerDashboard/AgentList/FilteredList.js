import React, { Component, Fragment } from 'react'
import filterFunctions from './filters'
import InfiniteList from './InfiniteList'
import FilterPills from './FilterPills'

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
    return (
      <Fragment>
        <FilterPills filters={this.props.filters} />
        <InfiniteList data={this.state.filteredData} dataSetKey={this.props.dataSetKey}/>
      </Fragment>
    )
  }
}

export default FilteredList
