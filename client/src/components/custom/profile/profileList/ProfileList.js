import React, {Fragment, useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Select from 'react-select'
import Loading from '../../../core/LoadingScreen/Loading'
import FilteredList from './filteredList/FilteredList'
import FilterModal from './modals/filterModel/FilterModal'
import SaveFilterMod from './modals/saveFilterMod'
import axios from 'axios'

import {loadProfileList, loadSavedFilter, loadMoreDataProfileList, setFilter} from '../../../../actions/profile'
import IconButton from "../../../core/IconButton";


const ProfileList = ({loadProfileList,loadSavedFilter, loadMoreDataProfileList, profileList, settings,activeFilter, setFilter, isFiltered }) => {
    
    const { profileType, statusSelect: { options, selected, selectedQuery } } = settings

  

    const [selectStatus, setStatus] = useState({options, selected})
    const [showFilterMod, tglFilterMod] = useState(false)
    const [showSaveFltrMod, tglSaveFltrMod] = useState(false)
    const [searchString, setSearchString] = useState('')
    const [listPage, setListPage] = useState(0)
    const [audiences, setAudiences] = useState([])
    const [savedFilters, setSavedFilters] = useState([])

    useEffect(() => {
      axios.get(`/api/profile/${profileType}/audiences`).then((res) => {
        setAudiences(res.data)
      })
      axios.get(`/api/profile/${profileType}/filters`).then((res) => {
        setSavedFilters(res.data)
      })
    }, [])

    useEffect(() => {
        loadProfileList(profileType, selectedQuery)
    }, [profileType])

    const loadNextPage = () => {
      loadMoreDataProfileList(profileType, selectStatus.selected.value, listPage + 1)
      setListPage(listPage + 1)
    }

    //load saved filters
    useEffect(() => {
      if (savedFilters.length || audiences.length){
        const optionsObj = [{
            label: '',
            options: options.slice()
        }]
        optionsObj.push({
            label: 'Audience',
            options: audiences.map((filter) => ({ value: filter._id, label: filter.name, filter:true, filterType: 'audience' }))
        })
        optionsObj.push({
            label: 'Filters',
            options: savedFilters.map((filter) => ({ value: filter._id, label: filter.name, filter: true, filterType: 'filter' }))
        })
        setStatus({...selectStatus, options: optionsObj})  
      }
    }, [audiences, savedFilters])

    const setListByStatus = (v) => {
        if(v.filter){
            loadSavedFilter(v.value, profileType, v.filterType)
        }else{
            loadProfileList(profileType, v.value)
        }   
        setStatus({ ...selectStatus, selected: v })
    } 
 
    const clearFilter = () => {
      const filter = {
        status: {
          accessor: 'status',
          dataType: 'array',
          name: 'status',
          type: {
            value: 'in',
            operator: '$in'
          },
          value: selectedQuery
        }
      }
      setFilter(filter, false)
      loadProfileList(profileType, selectedQuery)
    }

    return profileList.loading ? <Loading/> :
        <Fragment>
            <Select
                className="agentStatusFilter"
                onChange={v => setListByStatus(v) }
                defaultValue="All"
                options={selectStatus.options}
                placeholder='Select Status'
                value={selectStatus.selected}
            />
            <div className="profile-list__search-container">
                <input
                    className='form-control profile-list__search-input'
                    tabIndex={0}
                    onChange={(e) => setSearchString( e.target.value)}
                    placeholder='Search'
                />
                <IconButton placement='bottom'
                            tooltipContent='Create filter'
                            iconClass='fas fa-filter'
                            btnClass='profile-list__filter-icon'
                            variant='filter'
                            onClickFunc={() => tglFilterMod(true)}/>
            </div>
            {isFiltered ? (
                <div className='profile-list__filtering-options-container'>
                    <button onClick={clearFilter}>Clear filter</button>
                    <button onClick={() => tglSaveFltrMod(true)}>Save filter</button>
                </div>
            ):null}
            <FilteredList
                data={profileList.list}
                searchString={searchString}
                //dataSetKey={this.state.statusSelected.value}
                loadNextPage={loadNextPage}
                loadingMore= {profileList.loadingMore}
                hasMore={profileList.hasMore}
                settings={settings}
            />
            
            <FilterModal
                show={showFilterMod}
                handleClose={() => tglFilterMod(false)}
                settings={settings}
            />
            <SaveFilterMod
                show={showSaveFltrMod}
                handleClose={() => tglSaveFltrMod(false)}
                activeFilter={activeFilter}
                profileList={profileList}
                profileType= {profileType}
            />
        </Fragment>


    
}

ProfileList.propTypes = {
    profileList: PropTypes.object.isRequired
}



const mapStateToProps = state => ({
    profileList: state.profile.profileList,
    activeFilter: state.profile.activeFilter,
    isFiltered: state.profile.isFiltered
});



export default connect(mapStateToProps, {loadProfileList, loadSavedFilter, loadMoreDataProfileList, setFilter})(ProfileList)