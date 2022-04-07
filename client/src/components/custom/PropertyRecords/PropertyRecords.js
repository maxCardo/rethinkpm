import React from 'react'
import {connect} from 'react-redux'

import FilterWrapper from '../../core/filterWrapper/FilterWrapper'
import Table from '../../core/newTable/_Table'


const PropertyRecords = () => {
    
    return (
        <div>
            <p>this is the property record page</p>
        </div>
    )
}

const mapStateToProps = state => ({
    filteredData: state.filteredData
})


export default connect(mapStateToProps, {})(PropertyRecords)

