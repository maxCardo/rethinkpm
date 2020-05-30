import React, {Fragment, useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Select from 'react-select'
import Loading from '../../../core/LoadingScreen/Loading'
import FilteredList from './filteredList/FilteredList'
import FilterModal from './modals/filterModel/FilterModal'
import SaveFilterMod from './modals/saveFilterMod'

import {loadProfileList, loadSavedFilter, loadMoreDataProfileList} from '../../../../actions/profile'


const ProfileList = ({loadProfileList,loadSavedFilter, loadMoreDataProfileList, profileList, settings,activeFilter,savedFilters }) => {
    
    const { profileType, statusSelect: { options, selected, selectedQuery } } = settings

  

    const [selectStatus, setStatus] = useState({options, selected})
    const [showFilterMod, tglFilterMod] = useState(false)
    const [showSaveFltrMod, tglSaveFltrMod] = useState(false)
    const [searchString, setSearchString] = useState('')
    const [listPage, setListPage] = useState(0)

    useEffect(() => {
        loadProfileList(profileType, selectedQuery)
    }, [profileType])

    const loadNextPage = () => {
      loadMoreDataProfileList(profileType, selectStatus.selected.value, listPage + 1)
      setListPage(listPage + 1)
    }

    //load saved filters
    useEffect(() => {
        if (savedFilters.length){
            const filterOptions = savedFilters.filter(x => x.filterType === 'filter')
            const audienceOptions = savedFilters.filter(x => x.filterType === 'audience')
            console.log(audienceOptions)
            const optionsObj = [{
                label: '',
                options: options.slice()
            }]
            optionsObj.push({
                label: 'Audience',
                options: audienceOptions.map((filter) => ({ value: filter._id, label: filter.name, filter:true }))
            })
            optionsObj.push({
                label: 'Filters',
                options: filterOptions.map((filter) => ({ value: filter._id, label: filter.name, filter: true }))
            })
            setStatus({...selectStatus, options: optionsObj})  
        }
    }, [savedFilters])

    const setListByStatus = (v) => {
        if(v.filter){
            loadSavedFilter(v.value, profileType)
        }else{
            loadProfileList(profileType, v.value)
        }   
        setStatus({ ...selectStatus, selected: v })
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
            <div className="agent-list__search-container">
                <input
                    className='form-control agent-list__search-input'
                    tabIndex={0}
                    onChange={(e) => setSearchString( e.target.value)}
                    placeholder='Search'
                />
                <button className='agent-list__filter-icon' onClick={() => tglFilterMod(true)}>
                    <i className="fas fa-filter"></i>
                </button>
            </div>
            {activeFilter.length ? (
                <div className='agent-list__filtering-options-container'>
                    <button onClick={() => loadProfileList(profileType, selectedQuery)}>Clear filter</button>
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
            />
            {searchString && (<a onClick={() => console.log('clcick')}> do not see the record you are </a>)}
            
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
    savedFilters: state.profile.savedFilters
});



export default connect(mapStateToProps, {loadProfileList, loadSavedFilter, loadMoreDataProfileList})(ProfileList)