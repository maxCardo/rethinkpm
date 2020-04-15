import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";

class SalesHistory extends Component {
  render() {
    const propertiesSold = this.props.profile.agentSells;
    const propertiesBought = this.props.profile.agentBuys;
    const multiSalesMade = this.props.profile.agentMultiSales;

    return (
      <Fragment>
        <div className='profile__main-container agentProfile'>
          <div className='profile__left-container'>

            <div className="agent__stats-container">
              <div className="agent__stats agent__stats-sold">
                <h6>Buyer's Agent</h6>
                <ul>
                  {propertiesSold.map((val, idx) => {
                    return <li key={idx}>
                      <div className="zip"><b>Zip:</b> {val.zipcode}</div>
                      <div className="county"><b>County:</b> {val.county}</div>
                      <div className="area"><b>Area:</b> {val.area}</div>
                      <div className="listPrice"><b>Listing price:</b> {this.moneyFormat(val.listPrice)}</div>
                      <div className="listPrice"><b>Price Sold:</b> {this.moneyFormat(val.soldPrice)}</div>
                    </li>
                  })}
                </ul>
              </div>
              <div className="agent__stats agent__stats-bought">
                <h6>Seller's Agent</h6>
                <ul>
                  {propertiesBought.map((val, idx) => {
                    return <li key={idx}>
                      <div className="zip">Zip: {val.zipcode}</div>
                      <div className="county">County: {val.county}</div>
                      <div className="area">Area: {val.area}</div>
                      <div className="listPrice">Listing price: {this.moneyFormat(val.listPrice)}</div>
                      <div className="listPrice">Price sold: {this.moneyFormat(val.soldPrice)}</div>
                    </li>
                  })}
                </ul>
              </div>
              <div className="agent__stats agent__stats-multi">
                <h6>Double sales  </h6>
                <ul>
                  {multiSalesMade.map((val, idx) => {
                    return <li key={idx}>
                      <div className="zip">Zip: {val.zipcode}</div>
                      <div className="county">County: {val.county}</div>
                      <div className="area">Area: {val.area}</div>
                      <div className="listPrice">Listing price: {this.moneyFormat(val.listPrice)}</div>
                      <div className="listPrice">Price sold: {this.moneyFormat(val.soldPrice)}</div>
                    </li>
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
  moneyFormat(sum) {
    return (new Intl.NumberFormat('en-US',
      {style: 'currency', currency: 'USD'}
    ).format(sum))
  }
}

export default  SalesHistory;