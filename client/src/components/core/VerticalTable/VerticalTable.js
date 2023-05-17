import React, { Component } from 'react'
import Table from '../Table'
import commonMappers from '../Table/commonMappers'

export class VerticalTable extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  static getDerivedStateFromProps(props, state) {
    const headers = props.headers;
    const data = props.data;
    const newState = {}
    newState.headers = [
      {
        label: 'Property',
        accessor: 'property'
      },
      {
        label: 'Value',
        accessor: 'value'
      },
    ]
    const dataItems = []
    headers.forEach((header) => {
      dataItems.push(VerticalTable.generateDataItem(data, header))
    })
    newState.data = dataItems
    return newState
  }
  static generateDataItem(data, header) {
    if(header.computed) {
      return {
        property: header.label,
        value: header.calculate(data)
      }
    } else if(header.accessor) {
      let value = VerticalTable.getData(data, header.accessor)
      if(header.mapper) {
        value = VerticalTable.mapData(header.mapper, value)
      }
      return {
        property: header.label,
        value: ''+value
      }
    }
  }
  static mapData(mapper, data) {
    if(typeof mapper == 'string') {
      return commonMappers(mapper)(data)
    }
    return mapper(data)
  }
  static getData(data, accessor) {
    if (accessor.includes('.')) {
      const accessorsArray = accessor.split('.')
      let item = data;
      accessorsArray.forEach((accessor) => {
        if (item) {
          item = item[accessor]
        }
      })
      return item
    } else {
      return data[accessor]
    }
  }
  render() {
    return (
      <div className='VerticalTable'>
        <Table headers={this.state.headers} data={this.state.data} />
      </div>
    )
  }
}

export default VerticalTable
