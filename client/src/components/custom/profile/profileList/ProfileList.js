import React, {Fragment, useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Select from 'react-select'
import Loading from '../../../core/LoadingScreen/Loading'
import FilteredList from './filteredList/FilteredList'
import FilterModal from './modals/filterModel/FilterModal'
import SaveFilterMod from './modals/saveFilterMod'

import {loadProfileList} from '../../../../actions/profile'

const ProfileList = ({loadProfileList, profileList, settings,activeFilter }) => {

    const { profileType, statusSelect: { options, selected, selectedQuery } } = settings
    const [selectStatus, setStatus] = useState({options, selected})
    const [showFilterMod, tglFilterMod] = useState(false)
    const [showSaveFltrMod, tglSaveFltrMod] = useState(false)
    const [searchString, setSearchString] = useState('')

    useEffect(() => {
        loadProfileList(profileType, selectedQuery)
    }, [])

    const setListByStatus = (v) => {
        loadProfileList(profileType, v.value)  
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
    activeFilter: state.profile.activeFilter
});



export default connect(mapStateToProps, {loadProfileList})(ProfileList)