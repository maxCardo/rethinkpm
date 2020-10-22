import React, {Component} from 'react'
import Header from './Header'
import Pagination from './Pagination';
import commonMappers from './commonMappers';
import {filterData, getData} from "../../../util/commonFunctions";
import './style.css'

//TODO: Default sortBy is not working
export class Table extends Component {
  constructor(props) {
    super(props);
    const headers = Table.processHeaders(props);
    this.filter = this.props.filter ? this.props.filter : ''
    this.sortDirectionsInitial = Table.resetSortDirections(headers, props.sortBy, props.sortDirection)
    let sortedData = props.data.slice();

    if (props.sortBy) {
      sortedData = Table.sortDataByProp(props, sortedData)
    }

    const data = filterData(sortedData, this.filter, headers)
    this.state = {
      sortDirections: this.sortDirectionsInitial.slice(),
      data: data,
      sortedData: sortedData,
      paginatedData: data.slice(0, this.props.pageSize),
      pageIndex: 0,
      pageSize: props.pageSize,
      actualFilterString: this.props.filter,
      headers,
      alreadySorted: false,
      rawData: props.data
    }
    this.increasePage = this.increasePage.bind(this);
    this.decreasePage = this.decreasePage.bind(this)
    this.changePage = this.changePage.bind(this)
  }

  static processHeaders(props) {
    return props.headers.map((header) => {
      if (!header.label) {
        header.label = header.accessor
      }
      if (props.sorting) {
        if (!header.reactComponent) {
          header.sortable = true;
        }
      }
      return header;
    })
  }

  static sortDataByProp(props, data) {
    const sortBy = props.sortBy
    return data.sort((a, b) => {
      if(props.sortDirection === 'desc') {
        if(b[sortBy] > a[sortBy]) {
          return 1
        } else if(b[sortBy] < a[sortBy]) {
          return -1
        } else {
          return b._id > a._id ? 1 : -1
        }
      } else {
        if(b[sortBy] > a[sortBy]) {
          return -1
        } else if(b[sortBy] < a[sortBy]) {
          return 1
        } else {
          return b._id > a._id ? 1 : -1
        }
      }
    });
  }

  static resetSortDirections(headers, sortBy, sortDirection) {
    return headers.map((header) => {
      if (header.accessor === sortBy) {
        return sortDirection
      }
      return 'notSorted'
    })
  }

  static compareArrays(arr1, arr2) {
    if (arr1.length !== arr2.length) return false
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i]._id !== arr2[i]._id) return false
    }
    return true;
  }

  static getDerivedStateFromProps(props, state) {
    const version = props.version ? props.version : 0

    const pageSize = props.pageSize ? props.pageSize : Infinity;
    const headers = Table.processHeaders(props)

    let canWeUsePreviousSortedData = (version === state.version) && state.sortedData.length && Table.compareArrays(state.rawData, props.data)

    let sortedData = canWeUsePreviousSortedData ? state.sortedData.slice() : props.data.slice();

    let newSortDirections = state.sortDirections.slice()
    let weNeedToSort = !Table.compareArrays(state.rawData, props.data) || (props.sortBy && !state.alreadySorted)

    if (weNeedToSort) {
      newSortDirections = Table.resetSortDirections(headers, props.sortBy, props.sortDirection)
      sortedData = Table.sortDataByProp(props, sortedData)
    }

    if (props.filter === state.actualFilterString && !Table.compareArrays(state.rawData, props.data)) {
      const pageSize = props.pageSize ? props.pageSize : Infinity;
      const index = state.pageIndex ? state.pageIndex : 0;
      const newPaginatedData = sortedData.slice(pageSize * index, pageSize * (index + 1))
      return {
        headers,
        data: sortedData,
        sortedData: sortedData,
        paginatedData: newPaginatedData,
        sortDirections: newSortDirections,
        rawData: props.data.slice(),
        version: version,
        pageSize: pageSize,
      };
    } else {
      const newFilterString = props.filter ? props.filter : ''
      const newData = filterData(sortedData, newFilterString, headers)
      let pageIndex = state.pageIndex ? state.pageIndex : 0
      if(state.pageSize !== props.pageSize) {
        const firstItemInPage = (pageIndex * state.pageSize) + 1;
        const firstPageThatShowsItem = Math.floor(firstItemInPage / props.pageSize)
        pageIndex = firstPageThatShowsItem
      }
      const newPaginatedData = pageSize === Infinity ? newData : newData.slice(pageSize * pageIndex, pageSize * (pageIndex + 1));
      return {
        data: newData,
        sortedData: sortedData,
        paginatedData: newPaginatedData,
        pageIndex: pageIndex,
        actualFilterString: newFilterString,
        headers: headers,
        sortDirections: newSortDirections,
        rawData: props.data.slice(),
        version: version,
        pageSize: pageSize,
      }
    }
  }

  render() {
    const fontSize = this.props.fontSize ? this.props.fontSize : 12;
    return (
      <div>
        <table className={this.props.className + ' table table-striped ' + (this.props.scrolling ? 'table-scrollable' : '')} style={{fontSize: fontSize}}>
          <thead>
          <tr>
            {this.state.headers.map((header, index) => (
              <Header
                {...header}
                handleSort={this.handleSort.bind(this, index)}
                sortDirection={this.state.sortDirections[index]}
                fontSize={this.props.fontSize}
                key={`header-${index}`}
              />
            ))}
          </tr>
          </thead>
          <tbody style={{maxHeight: this.props.maxHeight}}>
          {(this.props.loading || this.state.paginatedData.length > 0) ? (this.state.paginatedData.map((dataItem, index) => (
            <tr
              key={`row-${index}`}
              style={{cursor: this.props.onClickRow ? 'pointer' : ''}}
              onClick={this.props.onClickRow ? () => this.props.onClickRow(dataItem) : () => {

              }}
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
          ))) : (<tr>
            <td colSpan={this.state.headers.length}>No results!</td>
          </tr>)}
          </tbody>
        </table>
        {this.props.data.length > this.props.pageSize &&
        <Pagination
          actualIndex={this.state.pageIndex}
          totalPages={Math.ceil(this.state.data.length / this.props.pageSize)}
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

    if (sortDirection === 'notSorted' || sortDirection === 'desc') {
      newSortDirections[index] = 'asc'
    } else {
      newSortDirections[index] = 'desc'
    }

    const data = this.state.data.sort((a, b) => {
      if (newSortDirections[index] === 'asc') {
        return getData(a, this.state.headers[index]) > getData(b, this.state.headers[index]) ? 1 : -1
      } else {
        return getData(b, this.state.headers[index]) > getData(a, this.state.headers[index]) ? 1 : -1
      }
    });
    this.setState({
      alreadySorted: true,
      sortDirections: newSortDirections,
      sortedData: data,
      paginatedData: data.slice(0, this.props.pageSize),
      pageIndex: 0
    })
  }

  changePage(index) {
    const newPaginatedData = this.state.data.slice(this.props.pageSize * index, this.props.pageSize * (index + 1))
    this.setState({pageIndex: index, paginatedData: newPaginatedData, alreadySorted: true})
  }

  mapData(mapper, data) {
    if (typeof mapper == 'string') {
      return commonMappers(mapper)(data)
    }
    return mapper(data)
  }

  increasePage() {
    if (this.state.pageIndex >= Math.ceil(this.state.data.length / this.props.pageSize)) {
      return;
    }
    this.changePage(this.state.pageIndex + 1)
  }

  decreasePage() {
    if (this.state.pageIndex === 0) {
      return;
    }
    this.changePage(this.state.pageIndex - 1)
  }

}

Table.defaultProps ={
  pageSize: Infinity
}


export default Table
