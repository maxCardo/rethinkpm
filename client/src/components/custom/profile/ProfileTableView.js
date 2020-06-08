import React, { Component } from 'react'
import {connect} from 'react-redux'
import { loadProfileTableView } from '../../../actions/profile'
import axios from 'axios';
import LoadingScreen from '../LoadingScreen/LoadingScreen'
import TableView from '../TableView/TableView'
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
    this.toggleTableType = this.toggleTableType.bind(this)
  }
  componentDidMount() {
    // this.props.loadProfileTableView(this.props.settings.profileType, this.axiosSource.token)
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
              <i className="fas fa-table"></i> Table View
            </button>
          </div>
          <div>
            <button className='profile-table-view__icon-button' onClick={this.toggleFilterModal}>
              <i className="fas fa-filter"></i>
            </button>
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
}

const mapStateToProps = state => ({
  profileList: state.profile.profileList,
})

export default connect(mapStateToProps, {loadProfileTableView})(ProfileTableView)
