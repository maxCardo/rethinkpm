import React, { Component } from 'react'
import Header from './Header'
import Pagination from './Pagination';

export class Table extends Component {
  constructor(props) {
    super(props);
    this.headers = this.props.headers.map((header) => {
      if(!header.label) {
        header.label = header.accessor
      }
      if(this.props.sorting){
        header.sortable = true;
      }
      return header;
    })
    this.filter = this.props.filter ? this.props.filter : '' 
    this.sortDirectionsInitial = this.props.headers.map(() => 'notSorted')
    this.pageSize = this.props.pageSize ? this.props.pageSize : Infinity;
    const data = Table.filterData(this.props.data.slice(), this.filter, this.headers)
    this.state = {
      sortDirections: this.sortDirectionsInitial.slice(),
      data: data,
      paginatedData: data.slice(0, this.pageSize),
      pageIndex: 0,
      actualFilterString: this.props.filter
    }
    this.increasePage = this.increasePage.bind(this);
    this.decreasePage = this.decreasePage.bind(this)
  }
  static getDerivedStateFromProps(props, state) {
    if(props.filter === state.actualFilterString) return;
    const pageSize = props.pageSize ? props.pageSize : Infinity;
    const newFilterString = props.filter ? props.filter : ''
    const newData = Table.filterData(props.data.slice(), newFilterString, props.headers)
    return {
      data: newData,
      paginatedData: newData.slice(0, pageSize),
      pageIndex: 0,
      actualFilterString: newFilterString
    }
  }
  static filterData(data, filterString, headers) {
    const newData = data.filter((elem) => {
      let includeItem = false;
      headers.forEach((header) => {
        const columnString = '' + elem[header.accessor]
        console.log(columnString)
        if(columnString.includes(filterString)) {
          includeItem = true;
        }
      })
      return includeItem
    })
    console.log(newData)
    return newData
  }
  render() {
    return (
      <div>
        <table className='table table-striped'>
          <thead>
            {this.headers.map((header, index) => (
              <Header {...header} handleSort={this.handleSort.bind(this,index)} sortDirection={this.state.sortDirections[index]}/>
            ))}
          </thead>
          <tbody>
            {this.state.paginatedData.map((dataItem) => (
              <tr>
                {this.headers.map((header) => (
                  <td>
                    {header.mapper ? 
                      header.mapper(dataItem[header.accessor]) + '' :
                      dataItem[header.accessor] + ''
                    }
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {this.props.data.length > this.pageSize && 
          <Pagination actualIndex={this.state.pageIndex} totalPages={Math.ceil(this.state.data.length/this.pageSize)} changePage={this.changePage.bind(this)}/>
        }
      </div>
    )
  }
  handleSort(index) {
    const sortDirection = this.state.sortDirections[index]
    const newSortDirections = this.sortDirectionsInitial.slice()

    if(sortDirection === 'notSorted' || sortDirection === 'desc') {
      newSortDirections[index] = 'asc'
    } else {
      newSortDirections[index] = 'desc'
    }

    const data = this.state.data.sort((a, b) => {
      if(newSortDirections[index] === 'asc') {
        return a[this.headers[index].accessor] > b[this.headers[index].accessor] ? 1 : -1
      } else {
        return b[this.headers[index].accessor] > a[this.headers[index].accessor]  ? 1 : -1
      }
    });
    console.log(data)
    this.setState({sortDirections: newSortDirections, data, paginatedData: data.slice(0, this.pageSize), pageIndex: 0 })
  }
  changePage(index) {
    const newPaginatedData = this.state.data.slice(this.pageSize * index, this.pageSize * (index+1))
    this.setState({pageIndex: index, paginatedData: newPaginatedData})
  }
  increasePage() {
    if(this.state.pageIndex >= Math.ceil(this.state.data.length/this.pageSize)) {
      return;
    }
    this.changePage(this.state.pageIndex + 1)
  }
  decreasePage() {
    if(this.state.pageIndex === 0) {
      return;
    }
    this.changePage(this.state.pageIndex - 1)
  }
  
}


export default Table
