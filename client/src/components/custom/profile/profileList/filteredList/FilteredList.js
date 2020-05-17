import React , {Fragment, useState} from 'react'
import {connect} from 'react-redux'
//import {Link} from 'react-router-dom'

import Pill from './Pills'
import InfList from './InfList'

const FilteredList = ({data, searchString, filters}) => {


    const [showPills, setShowPills] = useState(true)
 

    var representValue = (value) => {
        if (Array.isArray(value)) {
            return `[${value.join(', ')}]`
        }
        return value
    }

    const searchData = data.filter(profile => profile.fullName.toLowerCase().includes(searchString.toLowerCase()) && profile) 

    return (
        <Fragment>
            {/* Pills */}
            {console.log(filters)}
            <div className='filter-pills__container'>
                <div className='filter-pills__title-container'>
                    <p>Filters:</p> 
                    <button onClick={() => setShowPills(!showPills)}>{showPills ? 'Hide' : 'Show'}</button>
                </div>
                {showPills ?
                    <div className='filter-pills__pills-container'>

                        {filters.map((filter, index) => (
                            <Pill key={index} text={`${filter.field} ${filter.filterType} ${representValue(filter.value)}`} />
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

const mapStateToProps = state => ({
    filters: state.profile.activeFilter
})


export default connect(mapStateToProps)(FilteredList)