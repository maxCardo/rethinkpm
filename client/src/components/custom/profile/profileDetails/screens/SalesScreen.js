import React, {useEffect,useState, Fragment} from 'react'
import {connect} from 'react-redux'
import Loading from '../../../../core/LoadingScreen/Loading'

import {loadProfileSales} from '../../../../../actions/profile'


const SalesScreen = ({pastSales, activeProfile, profileType, loadProfileSales}) => {
    const propertiesSold = pastSales.sellersAgent ? pastSales.sellersAgent : []
    const propertiesBought = pastSales.buyersAgent ? pastSales.buyersAgent : []
    const multiSalesMade = pastSales.multiSales ? pastSales.multiSales : []
    const [loading, setLoading] = useState(pastSales.loading)
    
    const  moneyFormat = (sum) => {
        return (new Intl.NumberFormat('en-US',
            { style: 'currency', currency: 'USD' }
        ).format(sum))
    }

    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            await loadProfileSales(profileType, activeProfile.agentId)
            setLoading(false)
        }
        fetchData()
    }, [activeProfile])

    return (
        loading ? <Loading/> : <Fragment>
            <div className="agent__stats-container">
                <div className="agent__stats agent__stats-sold">
                    <h6>Buyer's Agent</h6>
                    <ul>
                        {propertiesSold.map((val, idx) => {
                            return <li key={idx}>
                                <div className="address"><b>Address:</b> {val.address}</div>
                                <div className="county"><b>County:</b> {val.county}</div>
                                <div className="area"><b>Area:</b> {val.area}</div>
                                <div className="zip"><b>Zip:</b> {val.zipcode}</div>
                                <div className="listPrice"><b>Listing price:</b> {moneyFormat(val.listPrice)}</div>
                                <div className="listPrice"><b>Price Sold:</b> {moneyFormat(val.soldPrice)}</div>
                            </li>
                        })}
                    </ul>
                </div>
                <div className="agent__stats agent__stats-bought">
                    <h6>Seller's Agent</h6>
                    <ul>
                        {propertiesBought.map((val, idx) => {
                            return <li key={idx}>
                                <div className="address"><b>Address:</b> {val.address}</div>
                                <div className="county"><b>County:</b> {val.county}</div>
                                <div className="area"><b>Area:</b> {val.area}</div>
                                <div className="zip"><b>Zip:</b> {val.zipcode}</div>
                                <div className="listPrice"><b>Listing price: </b>{moneyFormat(val.listPrice)}</div>
                                <div className="listPrice"><b>Price sold:</b> {moneyFormat(val.soldPrice)}</div>
                            </li>
                        })}
                    </ul>
                </div>
                <div className="agent__stats agent__stats-multi">
                    <h6>Multi Sales  </h6>
                    <ul>
                        {multiSalesMade.map((val, idx) => {
                            return <li key={idx}>
                                <div className="address"><b>Address:</b> {val.address}</div>
                                <div className="county"><b>County:</b> {val.county}</div>
                                <div className="area"><b>Area:</b> {val.area}</div>
                                <div className="zip"><b>Zip:</b> {val.zipcode}</div>
                                <div className="listPrice"><b>Listing price:</b> {moneyFormat(val.listPrice)}</div>
                                <div className="listPrice"><b>Price sold:</b> {moneyFormat(val.soldPrice)}</div>
                            </li>
                        })}
                    </ul>
                </div>
            </div>
        </Fragment>
    )
}

const mapStateToProps = state => ({
    activeProfile: state.profile.activeProfile,
    pastSales: state.profile.pastSales

})

export default connect(mapStateToProps, {loadProfileSales})(SalesScreen)
