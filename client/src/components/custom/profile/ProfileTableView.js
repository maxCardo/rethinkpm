import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux'
import { loadProfileTableView } from '../../../actions/profile'
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
  }
  componentDidMount() {
    this.props.loadProfileTableView(this.props.settings.profileType, this.props.activeFilter, this.axiosSource.token)
  }
  componentWillUnmount() {
    this.axiosSource.cancel()
  }
  render() {
    const statuses = this.props.settings.statusOptions.map((status) => ({label: status.label , key: status.value}))
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
            {this.props.activeFilter.length ? (
            <Fragment>
              <button onClick={this.toggleSaveFilterModal}>Save filter</button>
              <button onClick={() => this.props.loadProfileTableView(this.props.settings.profileType, [] ,this.axiosSource.token)}>Clear filter</button>
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
}

const mapStateToProps = state => ({
  profileList: state.profile.profileList,
  activeFilter: state.profile.activeFilter
})

export default connect(mapStateToProps, {loadProfileTableView})(ProfileTableView)