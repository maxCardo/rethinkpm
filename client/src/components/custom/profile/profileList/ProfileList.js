import React, {Fragment, useState, useEffect} from 'react'
import Select from 'react-select'

import FilteredList from './filteredList/FilteredList'
import FilterModal from './modals/FilterModal'
import SaveFilterMod from './modals/saveFilterMod'

const ProfileList = () => {
    //refactor into settings.json
    const statusSelectOptions = [
        { label: 'All', value: 'all' },
        { value: 'new', label: 'Lead' },
        { value: 'prospect', label: 'Prospect' },
        { value: 'pending', label: 'Pending' },
        { value: 'agent', label: 'Agent' },
        { value: 'notInterested', label: 'Not Interested' },
    ];
    const [selectStatus, setStatus] = useState({options: {statusSelectOptions}, default:{ label: 'All', value: 'all' }})
    const [list, setList] = useState()
    const [showFilterMod, tglFilterMod] = useState(false)
    const [showSaveFltrMod, tglSaveFltrMod] = useState(false)

    useEffect(() => {
        //get audiances/filters combine with select options (from settings.json)
        var test = statusSelectOptions.slice()
        console.log(test);
        console.log(statusSelectOptions);
    }, [])

    const setSearch = (e) => {
        console.log('running search');
    }
    

    return (
        <Fragment>
            <Select
                className="agentStatusFilter"
                onChange={v => setStatus({value:v})}
                defaultValue="All"
                options={selectStatus.options}
                placeholder='Select Status'
            />
            <div className="agent-list__search-container">
                <input
                    className='form-control agent-list__search-input'
                    tabIndex={0}
                    onChange={(e) => setSearch( e.target.value)}
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
                //data={data}
                //filters={filters}
                //dataSetKey={this.state.statusSelected.value}
            />
            {/* <FilterModal
                //show={this.state.showAgentFiltersModal}
                //handleClose={() => this.setState({ showAgentFiltersModal: false })}
                //handleSubmit={this.handleModalSubmit}
                //officeOptions={this.state.officeOptions}
            /> */}
            <SaveFilterMod
                show={showSaveFltrMod}
                handleClose={() => tglSaveFltrMod(false)}
                //saveAudience={this.saveAudience}
                //saveFilter={this.saveFilter}
            />
        </Fragment>


    )
}



export default ProfileList