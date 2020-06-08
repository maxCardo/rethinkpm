import React , {Fragment, useState} from 'react'
import {connect} from 'react-redux'

import Pill from './Pills'
import InfList from './InfList'
import './filterList.css'

const FilteredList = ({data, searchString, filters, loadNextPage, loadingMore, hasMore, settings}) => {


    const [showPills, setShowPills] = useState(true)
 

    var representValue = (value) => {
        if (Array.isArray(value)) {
            return `[${value.join(', ')}]`
        }
        return value
    }
    console.log('searchString: ', searchString);
    console.log('fullName: ', data);

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

                        {filters.map((filter, index) => (
                            <Pill key={index} text={`${filter.field} ${filter.filterType} ${representValue(filter.value)}`} />
                        ))}
                    </div>
                    :
                    ''
                }
            </div>
            {/* End Pills  Start Inf List*/}
            <InfList data={searchData} loadNextPage={loadNextPage} loadingMore={loadingMore} hasMore={hasMore} settings={settings} />
        </Fragment>
    )
}

const mapStateToProps = state => ({
    filters: state.profile.activeFilter
})


export default connect(mapStateToProps)(FilteredList)