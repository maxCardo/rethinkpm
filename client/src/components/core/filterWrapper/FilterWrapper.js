import React , {useState, useEffect} from 'react'
import {connect} from 'react-redux' 

import FilterdToolbar from './FilterToolbar'
import FilterModal from './filterModel/FilterModal'
import VarifyMod from './VerifyMod'

import {getData, getFilterOptions, fetchFilteredData, submitSaveFilter, getSavedFilters, removeItem} from '../../../actions/filteredData'


const FilterWrapper = ({children, dataModel, filterActive, filterFields, filteredData, getData, getSavedFilters, getFilterOptions, fetchFilteredData, submitSaveFilter, bulkActions }) => {
 
    const {loading, savedFilters, filterOptions, activeFilter, selected, selectedData} = filteredData
    
    const [showFilterModal, setShowFilterModal] = useState(false)
    const [showSaveModal, setShowSaveModal] = useState(false)

    useEffect(() => {
        console.log('running use effect on filterwrapper')
        getData(dataModel)
        getSavedFilters(dataModel)
        getFilterOptions(dataModel, filterFields)
    },[])

    return loading ? (<div>loading...</div>) : (
        <div>
            <FilterdToolbar
                dataModel = {dataModel}
                selectedData = {selectedData}
                filterActive={filterActive}
                savedFilters = {savedFilters}
                onChange = {fetchFilteredData}
                filter = {activeFilter}
                selected= {selected}
                showFilterModal = {() => setShowFilterModal(true)}
                clearFilter = {() => getData(dataModel)}
                saveFilter = {() => setShowSaveModal(true)}
                bulkActions= {bulkActions}
            />
            {children}
            <FilterModal
                show={showFilterModal}
                filterFields={filterFields}
                options={filterOptions}
                handleClose={() => setShowFilterModal(false)}
                onSubmit={(e) => fetchFilteredData(dataModel, {filters: e})}
            />
            <VarifyMod
                show={showSaveModal}
                handleClose={() => setShowSaveModal(false)}
                handleSubmit={(name) => submitSaveFilter(dataModel, name, activeFilter)}
            />

        </div>
    )
}

const mapStateToProps = state => ({
    filteredData: state.filteredData
})


export default connect(mapStateToProps, {getData, getSavedFilters, getFilterOptions, fetchFilteredData, submitSaveFilter})(FilterWrapper)