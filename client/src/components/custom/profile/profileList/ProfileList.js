import React, {Fragment, useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Select from 'react-select'
import Loading from '../../../core/LoadingScreen/Loading'
import FilteredList from './filteredList/FilteredList'
import FilterModal from './modals/filterModel/FilterModal'
import SaveFilterMod from './modals/saveFilterMod'

import {loadProfileList} from '../../../../actions/profile'

const ProfileList = ({loadProfileList, profileList, settings}) => {

    const { profileType, statusSelect: { options, selected, selectedQuery } } = settings
    const [selectStatus, setStatus] = useState({options, selected})
    const [list, setList] = useState()
    const [showFilterMod, tglFilterMod] = useState(false)
    const [showSaveFltrMod, tglSaveFltrMod] = useState(false)
    const [searchString, setSearchString] = useState('')

    useEffect(() => {
        console.log('runnning profile list');
        //see if data available for this populations if no call api via action (double check call from Profile and reference call from BrokerDash)
        //grab audiances and filters and add to state.options, set as options in select Status
        loadProfileList(profileType, selectedQuery) 
        
        
    }, [loadProfileList])

    const setListByStatus = (v) => {
        loadProfileList(profileType, v.value) 
        setStatus({ ...selectStatus, selected: v })
    }

    const setSearch = () => {
        console.log('running set search')
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
            {/* show below conditionaly if filters are active */}
            <div className='agent-list__filtering-options-container'>
                <button onClick={() => setSearch('')}>Clear filter</button>
                <button onClick={() => tglSaveFltrMod(true)}>Save filter</button>
            </div>
            <FilteredList
                data={profileList.list}
                searchString={searchString}
                //dataSetKey={this.state.statusSelected.value}
            />
            <FilterModal
                show={showFilterMod}
                handleClose={() => tglFilterMod(false)}
                settings={settings}
            />
            <SaveFilterMod
                show={showSaveFltrMod}
                handleClose={() => tglSaveFltrMod(false)}
                //saveAudience={this.saveAudience}
                //saveFilter={this.saveFilter}
            />
        </Fragment>


    
}

ProfileList.propTypes = {
    profileList: PropTypes.object.isRequired
}



const mapStateToProps = state => ({
    profileList: state.profile.profileList
});



export default connect(mapStateToProps, {loadProfileList})(ProfileList)