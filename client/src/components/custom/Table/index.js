import React, { Component } from 'react'
import Header from './Header'
import Pagination from './Pagination';
import commonMappers from './commonMappers';
import { filterData, getData } from "../../../util/commonFunctions";
import './style.css'

export class Table extends Component {
  constructor(props) {
    super(props);
    const headers = props.headers.map((header) => {
      if(!header.label) {
        header.label = header.accessor
      }
      if(this.props.sorting){
        if(!header.reactComponent) {
          header.sortable = true;
        }
      }
      return header;
    })
    this.filter = this.props.filter ? this.props.filter : '' 
    this.sortDirectionsInitial = this.props.headers.map(() => 'notSorted')
    this.pageSize = this.props.pageSize ? this.props.pageSize : Infinity;
    let sortedData = this.props.data.slice();
    if(props.sortBy) {
      const sortBy = props.sortBy
      sortedData = sortedData.sort((a, b) => {
        if(props.sortDirection === 'desc') {
          return b[sortBy] > a[sortBy] ? 1 : -1
        } else {
          return a[sortBy] > b[sortBy]  ? 1 : -1
        }
      });
    }
    const data = filterData(sortedData, this.filter, headers)
    this.state = {
      sortDirections: this.sortDirectionsInitial.slice(),
      data: data,
      paginatedData: data.slice(0, this.pageSize),
      pageIndex: 0,
      actualFilterString: this.props.filter,
      headers,
      alreadySorted: false,
      rawData: props.data
    }
    this.increasePage = this.increasePage.bind(this);
    this.decreasePage = this.decreasePage.bind(this)
    this.changePage = this.changePage.bind(this)
  }
  static compareArrays(arr1, arr2) {
    if(arr1.length != arr2.length) return false
    for(let i = 0; i < arr1.length; i++) {
      if(arr1[i]._id != arr2[i]._id) return false
    }
    return true;
  }
  static getDerivedStateFromProps(props, state) {
    let data = props.data

    const pageSize = props.pageSize ? props.pageSize : Infinity;
    const headers = props.headers.map((header) => {
      if(!header.label) {
        header.label = header.accessor
      }
      if(props.sorting){
        if(!header.reactComponent) {
          header.sortable = true;
        }
      }
      return header;
    })
    let sortedData = state.data.length && Table.compareArrays(state.rawData, props.data) ? state.data.slice() : props.data.slice();

    let newSortDirections = state.sortDirections.slice()
    if(!Table.compareArrays(state.rawData,props.data) || props.sortBy && !state.alreadySorted) {
      const sortBy = props.sortBy
      newSortDirections = newSortDirections.map((sortDirection, index) => {
        if(headers[index].accessor === sortBy) {
          return props.sortDirection
        }
        return 'notSorted'
      })
      sortedData = sortedData.sort((a, b) => {
        if(props.sortDirection === 'desc') {
          return b[sortBy] > a[sortBy] ? 1 : -1
        } else {
          return a[sortBy] > b[sortBy]  ? 1 : -1
        }
      });
    }
    if(props.filter === state.actualFilterString && !Table.compareArrays(state.rawData,props.data)) {
      const pageSize = props.pageSize ? props.pageSize : Infinity;
      const index = state.pageIndex ? state.pageIndex : 0;
      const newPaginatedData = sortedData.slice(pageSize * index, pageSize * (index+1))
      return {
        headers, 
        data: sortedData,
        paginatedData: newPaginatedData,
        sortDirections: newSortDirections,
        rawData: props.data
      };
    } 
    const newFilterString = props.filter ? props.filter : ''
    const newData = filterData(sortedData, newFilterString, headers)
    return {
      data: newData,
      paginatedData: newData.slice(0, pageSize),
      pageIndex: 0,
      actualFilterString: newFilterString,
      headers: headers,
      sortDirections: newSortDirections,
      rawData: props.data
    }
  }

  render() {
    return (
      <div>
        <table className={this.props.className + ' table table-striped'} style={{tableLayout: 'fixed', fontSize: this.props.fontSize}}>
          <thead>
            <tr>
              {this.state.headers.map((header, index) => (
                <Header 
                  {...header} 
                  handleSort={this.handleSort.bind(this,index)} 
                  sortDirection={this.state.sortDirections[index]}
                  fontSize={this.props.fontSize}
                  key={`header-${index}`}
                />
              ))}
            </tr>
          </thead>
          <tbody>
            {(this.props.loading || this.state.paginatedData.length > 0) ? (this.state.paginatedData.map((dataItem, index) => (
              <tr 
                key={`row-${index}`} 
                style={{cursor: this.props.onClickRow ? 'pointer' : ''}} 
                onClick={this.props.onClickRow ? () => this.props.onClickRow(dataItem) : () => {}}
              >
                {this.state.headers.map((header, index) => (
                  <td key={`dataItem-${index}`} className={header.className}>
                    {header.mapper ? 
                      this.mapData(header.mapper, getData(dataItem, header)) :
                      getData(dataItem, header)
                    }
                  </td>
                ))}
              </tr>
            ))) : (<tr><td colspan={this.state.headers.length}>No results!</td></tr>)}
          </tbody>
        </table>
        {this.props.data.length > this.pageSize && 
          <Pagination 
            actualIndex={this.state.pageIndex} 
            totalPages={Math.ceil(this.state.data.length/this.pageSize)} 
            changePage={this.changePage.bind(this)}
            fontSize={this.props.fontSize}
          />
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
        return getData(a, this.state.headers[index]) > getData(b, this.state.headers[index]) ? 1 : -1
      } else {
        return getData(b, this.state.headers[index]) > getData(a, this.state.headers[index])  ? 1 : -1
      }
    });
    this.setState({alreadySorted: true, sortDirections: newSortDirections, data, paginatedData: data.slice(0, this.pageSize), pageIndex: 0 })
  }
  changePage(index) {
    const newPaginatedData = this.state.data.slice(this.pageSize * index, this.pageSize * (index+1))
    this.setState({pageIndex: index, paginatedData: newPaginatedData})
  }
  mapData(mapper, data) {
    if(typeof mapper == 'string') {
      return commonMappers(mapper)(data)
    }
    return mapper(data)
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
