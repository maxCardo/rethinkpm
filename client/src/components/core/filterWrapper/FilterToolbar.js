import React, {useState, Fragment} from 'react'
import IconButton from '../IconButton/_IconButton'

//dep for filter comp
import Select from 'react-select'
import './style.css'


const FilterdToolbar = ({checkbox = true, dataModel, selectedData, filterActive, showFilterModal, filter, saveFilter, selected, savedFilters, onChange, clearFilter, bulkActions=[]}) => {

  const handleFilterChange = (e) => {
    const {label, value: {filters, blacklist}} = e
    onChange(dataModel, e.value , {label: e.label, _id: e.value._id})    
  }


  const selectedFilterBar = () => {
    filterActive()
  }

  const numSelected = selectedData.length

    return (
        <div className='searchContainer agentsSearchContainer'>
            <div style={{display: 'flex'}}>
            <Select
                className="marketplace__filter-select"
                onChange={e => handleFilterChange(e)}
                onFocus={selectedFilterBar}
                onBlur={selectedFilterBar}
                defaultValue="All"
                options={savedFilters}
                placeholder='Select Filter'
                value={selected}
            />
            {/* filter string can be added in the future.  */}
            {/* <input
                className='form-control searchInput'
                tabIndex={0}
                onChange={(e) => setFilterString(e.target.value)}
                placeholder='Search'
            /> */}
            </div>
            <div className='marketplace__filter-icons'>
            {filter.length ?
            <Fragment>
                {!selected &&
                <button onClick={saveFilter}>Save filter</button>
                }
                <button onClick={clearFilter}>Clear filter</button>
            </Fragment>
            : null}
           
            {
                numSelected > 0 ?
                <Fragment>
                  {bulkActions.map((elem, i) => 
                    <button key = {i} title = {elem.action} onClick={() => elem.function(selectedData)}>
                      <i className={elem.icon}></i>
                    </button>
                  )}
                </Fragment>
                :
                <button onClick={() => showFilterModal(true)}>
                <i className="fas fa-filter"></i>
                </button>
            }
            {/* {!checkbox && (
                <button onClick={toggleCheckFlow}>
                    <i className="fas fa-check-square"></i>
                </button>
            )} */}
            
            </div>
      </div>
    )
    
}


export default FilterdToolbar
