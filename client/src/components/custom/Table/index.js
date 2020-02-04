import React, { Component } from 'react'
import Header from './Header'
import Pagination from './Pagination';

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
    let sortedData = this.props.data.slice()
    if(props.sortBy) {
      const sortBy = props.sortBy
      sortedData.sort((a, b) => {
        if(props.sortDirection === 'desc') {
          return b[sortBy] > a[sortBy] ? 1 : -1
        } else {
          return a[sortBy] > b[sortBy]  ? 1 : -1
        }
      });
    }
    const data = Table.filterData(sortedData, this.filter, headers)
    this.state = {
      sortDirections: this.sortDirectionsInitial.slice(),
      data: data,
      paginatedData: data.slice(0, this.pageSize),
      pageIndex: 0,
      actualFilterString: this.props.filter,
      headers
    }
    this.increasePage = this.increasePage.bind(this);
    this.decreasePage = this.decreasePage.bind(this)
    this.changePage = this.changePage.bind(this)
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
    if(props.filter === state.actualFilterString) {
      const pageSize = props.pageSize ? props.pageSize : Infinity;
      const index = state.pageIndex ? state.pageIndex : 0;
      const newPaginatedData = props.data.slice(pageSize * index, pageSize * (index+1))
      return {
        headers, 
        data: props.data,
        paginatedData: newPaginatedData
      };
    } 
    const newFilterString = props.filter ? props.filter : ''
    const newData = Table.filterData(props.data.slice(), newFilterString, headers)
    return {
      data: newData,
      paginatedData: newData.slice(0, pageSize),
      pageIndex: 0,
      actualFilterString: newFilterString,
      headers: headers,
    }
  }
  static filterData(data, filterString, headers, level=0) {
    const newData = data.filter((elem) => {
      let includeItem = false;
      headers.forEach((header) => {
        const columnString = '' + Table.getData(elem, header)
        if(columnString.toLowerCase().includes(filterString.toLowerCase())) {
          includeItem = true;
        }
      })
      return includeItem
    })
    console.log(filterString, newData)
    return newData
  }
  render() {
    return (
      <div>
        <table className='table table-striped' style={{tableLayout: 'fixed', fontSize: this.props.fontSize}}>
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
            {this.state.paginatedData.map((dataItem, index) => (
              <tr key={`row-${index}`}>
                {this.state.headers.map((header, index) => (
                  <td key={`dataItem-${index}`}>
                    {header.mapper ? 
                      header.mapper(Table.getData(dataItem, header)) :
                      Table.getData(dataItem, header)
                    }
                  </td>
                ))}
              </tr>
            ))}
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
        return a[this.state.headers[index].accessor] > b[this.state.headers[index].accessor] ? 1 : -1
      } else {
        return b[this.state.headers[index].accessor] > a[this.state.headers[index].accessor]  ? 1 : -1
      }
    });
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
  static getData(dataItem, header) {
    if(header.reactComponent) {
      return header.render(dataItem)
    } else {
      const {accessor} = header
      if(accessor.includes('.')) {
        const accessorsArray = accessor.split('.')
        let item = dataItem;
        accessorsArray.forEach((accessor) => {
          if(item) {
            item = item[accessor]
          }
        })
        return item + ''
      } else {
        return dataItem[accessor] + ''
      }
    }
  }
}


export default Table
