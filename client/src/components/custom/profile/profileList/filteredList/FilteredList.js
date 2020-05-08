import React , {Fragment, useState} from 'react'
import {Link} from 'react-router-dom'

import Pill from './Pills'

const FilteredList = () => {
    const [showPills, setShowPills] = useState(true)
    
    //placeholder filter object and rep value function
    var filters = [{field:'testField', filterType:'testType', value:'testValue'}]
    var representValue = (params) => {
        return params
    }
    
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
                        {filters.map((filter) => (
                            <Pill text={`${filter.field} ${filter.filterType} ${representValue(filter.value)}`} />
                        ))}
                    </div>
                    :
                    ''
                }
            </div>
            {/* End Pills  Start Inf List*/}
            {/* <div
                className="inf-scroll"
                ref={this.infiniteScroll}
                dataLength={this.state.items.length}
                next={this.fetchMoreData}
                hasMore={this.state.hasMore}
                loader={<p>Loading...</p>}
                key={this.props.dataSetKey}
                scrollThreshold={'50000px'}
                endMessage={
                    <p style={{ textAlign: "center" }}>No more results!</p>
                }>
                {this.props.data ? (
                    this.props.data.map((val) => {
                        return (
                            <div key={val._id}>
                                <Link to={`/profile/agent/${val._id}`}>
                                    <div className="list__picker-header"><span>{val.firstName} {val.lastName}</span> <span
                                        className="label__gray">{val.status}</span></div>
                                    <div className="list__picker-body">
                                        <span>skills status</span><span>{this.moneyFormat(val.sales)}</span>
                                    </div>
                                </Link>
                            </div>
                        )
                    })) : ''}
            </div>
            <div className='infinite-list__length-info'>
                <p>Total of Agents: {this.props.data.length}</p>
            </div> */}
        </Fragment>
    )
}


export default FilteredList