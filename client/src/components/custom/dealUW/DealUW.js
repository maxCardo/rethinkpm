import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {getDealData, getDealDataTest} from '../../../actions/sales'



const DealUW = ({getDealData, action2, auth:{user}, sales:{deal, loading}}) => {

    useEffect(() => {
        getDealData()
    },[getDealData])


    const action = () => {
        getDealDataTest()
        console.log(user.name)
        console.log(deal.test)
    }

    const LoadingComp = () => {
        return (
            <div>
                <h1>loading...</h1>
            </div>
        ) 
    }

    return (
        <Fragment>
            {loading ? <LoadingComp/> : <Fragment>    
                <div>
                    <br/>
                    <button onClick={action}>test</button>
                    <br/>
                    <p>{user.name}</p>
                    <br />
                    <br />
                    <button onClick={action2}>action 2</button>
                </div>
            </Fragment> }
        </Fragment>
    )    
}

DealUW.propTypes = {
    getDealData: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}



const mapStateToProps = state => ({
    auth: state.auth,
    sales: state.sales,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {getDealData})(DealUW)
