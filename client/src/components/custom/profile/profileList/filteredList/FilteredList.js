import React , {Fragment, useState, useEffect} from 'react'
import {Link} from 'react-router-dom'

import Pill from './Pills'
import InfList from './InfList'

const FilteredList = ({data, searchString}) => {


    const initalState = {
        filteredData: '',
        dataSetKey: '',
        filters : [{ field: 'testField', filterType: 'testType', value: 'testValue' }]
    }

    const [showPills, setShowPills] = useState(true)
    const [state, setState] = useState(initalState)

    var representValue = (params) => {
        return params
    }

    const searchData = data.filter(profile => profile.fullName.toLowerCase().includes(searchString.toLowerCase()) && profile) 

    return (
        <Fragment>
            {/* Pills */}
            <div className='filter-pills__container'>
                <div className='filter-pills__title-container'>
                    <p>Filters:</p> 
                    <button onClick={() => setShowPills(!showPills)}>{showPills ? 'Hide' : 'Show'}</button>
                </div>
                {showPills ?
                    <div className='filter-pills__pills-container'>
                        {state.filters.map((filter) => (
                            <Pill text={`${filter.field} ${filter.filterType} ${representValue(filter.value)}`}/>
                        ))}
                    </div>
                    :
                    ''
                }
            </div>
            {/* End Pills  Start Inf List*/}
            <InfList data={searchData}/>
        </Fragment>
    )
}


export default FilteredList