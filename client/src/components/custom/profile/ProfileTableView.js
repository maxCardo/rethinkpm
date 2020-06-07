import React, { Component } from 'react'
import {connect} from 'react-redux'
import { loadProfileTableView } from '../../../actions/profile'
import axios from 'axios';
import LoadingScreen from '../LoadingScreen/LoadingScreen'
import Dashboard from '../dashboard/Dashboard'
import FilterModal from './profileList/modals/filterModel/FilterModal'

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
  }
  componentDidMount() {
    this.props.loadProfileTableView(this.props.settings.profileType, this.axiosSource.token)
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
            <button className='dashboard__action-button' onClick={() => this.setTableType('select')}>
              <i className="fas fa-comments"></i>
            </button>
            <button className='dashboard__action-button' onClick={() => this.setTableType('tabbed')}>
              <i className="fas fa-comments"></i>
            </button>
            <button className='dashboard__action-button' onClick={() => this.setTableType('separated')}>
              <i className="fas fa-comments"></i>
            </button>
          </div>
          <div>
            <button className='profile-table-view__filter-icon' onClick={this.toggleFilterModal}>
              <i className="fas fa-filter"></i>
            </button>
          </div>
        </div>
        <Dashboard
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
      </LoadingScreen>
    )
  }
  setTableType(tableType) {
    this.setState({tableType})
  }
  toggleFilterModal() {
    this.setState((prevState) => ({showFilterMod: !prevState.showFilterMod}))
  }
}

const mapStateToProps = state => ({
  profileList: state.profile.profileList,
})

export default connect(mapStateToProps, {loadProfileTableView})(ProfileTableView)
