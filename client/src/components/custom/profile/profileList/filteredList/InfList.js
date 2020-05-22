import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'

import {setActiveProfile} from '../../../../../actions/profile'

export class InfiniteList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            items: [],
            hasMore: true
        }
    }


    moneyFormat(sum) {
        return (new Intl.NumberFormat('en-US',
            {style: 'currency', currency: 'USD'}
        ).format(sum))
    }

    onClick = (profile) => this.props.setActiveProfile(profile)


    render() {
        return (
            <Fragment>
                <div className="inf-scroll">
                    {this.props.data ? (
                        this.props.data.map((val) => {
                            return (
                                <div onClick={() => this.onClick(val)} key={val._id} className="list__picker">
                                    <div className="list__picker-header"><span>{val.firstName} {val.lastName}</span>
                                        <span
                                            className="label__gray">{val.status}</span></div>
                                    <div className="list__picker-body">
                                        <span>skills status</span><span>{this.moneyFormat(val.sales)}</span>
                                    </div>
                                </div>
                            )
                        })) : ''}
                  {this.state.hasMore ?
                    <button className='infinite-list__load-more' onClick={this.props.loadNextPage}>Load More</button>
                    :
                    ''
                  }
                </div>
                <div className='infinite-list__length-info'>
                    <p>Total of Agents: {this.props.data.length}</p>
                </div>
            </Fragment>
        )
    }
}


export default connect(null, {setActiveProfile})(InfiniteList)
