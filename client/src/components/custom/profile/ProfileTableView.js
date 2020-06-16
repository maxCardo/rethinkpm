import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux'
import { loadProfileTableView, setActiveProfile, setFilter } from '../../../actions/profile'
import axios from 'axios';
import LoadingScreen from '../LoadingScreen/LoadingScreen'
import TableView from '../TableView/TableView'
import FilterModal from './profileList/modals/filterModel/FilterModal'
import SaveFilterMod from './profileList/modals/saveFilterMod'


export class ProfileTableView extends Component {
  constructor(props) {
    super(props)
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    this.axiosSource = source
    this.state = {
      tableType: 'select',
      showFilterMod: false
    }
    this.toggleFilterModal = this.toggleFilterModal.bind(this)
    this.toggleTableType = this.toggleTableType.bind(this)
    this.toggleSaveFilterModal = this.toggleSaveFilterModal.bind(this)
    this.clearFilter = this.clearFilter.bind(this)
    this.onClickRow = this.onClickRow.bind(this)
  }
  componentDidMount() {
    if(this.props.profileList.hasMore) {
      this.props.loadProfileTableView(this.props.settings.profileType, this.props.activeFilter, this.axiosSource.token)
    }
  }
  componentWillUnmount() {
    this.axiosSource.cancel()
  }
  render() {
    const statuses = this.props.settings.statusOptions.map((status) => ({label: status.label , key: status.value}))
    statuses.unshift({label: 'All', key: '*'})
    const data = {} 
    this.props.profileList.list.forEach((profile) => {
      if(data[profile.status]) {
        data[profile.status].push(profile)
      } else {
        data[profile.status] = [profile]
      }
    })
    return (
      <LoadingScreen loading={this.props.profileList.loadingTableView}>
        <div className='profile-table-view__top-bar'>
          <div>
            <button className='profile-table-view__icon-button' onClick={this.toggleTableType}>
              <i className="fas fa-table"></i> Change Table View
            </button>
          </div>
          <div className='profile-table-view__filters'>
            <button className='profile-table-view__icon-button' onClick={this.toggleFilterModal}>
              <i className="fas fa-filter"></i>
            </button>
            {this.props.isFiltered ? (
            <Fragment>
              <button onClick={this.toggleSaveFilterModal}>Save filter</button>
              <button onClick={this.clearFilter}>Clear filter</button>
            </Fragment>
          ):null}
          </div>
          
        </div>
        <TableView
          type={this.state.tableType}
          data={data} 
          headers={this.props.settings.tableHeaders}
          states={statuses}
          sortBy='sales'
          sortDirection='desc'
          onClickRow={this.onClickRow}
        />
        <FilterModal
          show={this.state.showFilterMod}
          handleClose={this.toggleFilterModal}
          settings={this.props.settings}
        />
        <SaveFilterMod
          show={this.state.showSaveFltrMod}
          handleClose={this.toggleSaveFilterModal}
          activeFilter={this.props.activeFilter}
          profileList={this.props.profileList}
          profileType= {this.props.settings.profileType}
        />
      </LoadingScreen>
    )
  }
  toggleTableType() {
    const actualType = this.state.tableType
    let nextType = 'tabbed'
    if(actualType == 'tabbed') {
      nextType = 'separated'
    } else if(actualType == 'separated') {
      nextType = 'select'
    }
    this.setState({tableType: nextType})
  }
  toggleFilterModal() {
    this.setState((prevState) => ({showFilterMod: !prevState.showFilterMod}))
  }
  toggleSaveFilterModal() {
    this.setState((prevState) => ({showSaveFltrMod: !prevState.showSaveFltrMod}))
  }
  onClickRow(profile) {
    this.props.setActiveProfile(profile)
    this.props.changeTab('details')
  }
  clearFilter() {
    const filter = {
      status: {
        accessor: 'status',
        dataType: 'array',
        name: 'status',
        type: {
          value: 'in',
          operator: '$in'
        },
        value: this.props.settings.statusSelect.selectedQuery
      }
    }
    this.props.setFilter(filter, false)
    this.props.loadProfileTableView(this.props.settings.profileType, filter ,this.axiosSource.token)
  }
}

const mapStateToProps = state => ({
  profileList: state.profile.profileList,
  activeFilter: state.profile.activeFilter,
  isFiltered: state.profile.isFiltered
})

export default connect(mapStateToProps, {loadProfileTableView, setActiveProfile, setFilter})(ProfileTableView)
