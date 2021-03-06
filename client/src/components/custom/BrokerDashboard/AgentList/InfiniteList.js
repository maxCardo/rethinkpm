import React, { Component, Fragment } from 'react'
import {Link} from 'react-router-dom';

export class InfiniteList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      items: [],
      hasMore: true
    }
    this.fetchMoreData = this.fetchMoreData.bind(this)
  }

  static getDerivedStateFromProps(props,state) {
    if(state.rawData === props.data) return
    return {
      items: InfiniteList.getItemsFromData(props.data),
      rawData: props.data,
      hasMore: true
    }
  }

  moneyFormat(sum) {
    return (new Intl.NumberFormat('en-US',
      {style: 'currency', currency: 'USD'}
    ).format(sum))
  }

  fetchMoreData() {
    if (this.state.items.length >= this.props.data.length) {
      this.setState({ hasMore: false });
      return;
    }
    let theNewItems = [];
    this.props.data.forEach((dataItem) => {
        if ((this.state.items.indexOf(dataItem) === -1) && theNewItems.length < 20) {
          theNewItems.push(dataItem);
        }
    });
    this.setState({
      items: this.state.items.concat(theNewItems),
      hasMore: true
    });
  }

  static getItemsFromData(data) {
    if (data.length >= 20) {
      return data.slice(0,20);
    } else if (data.length > 0) {
      return data.slice(0,data.length);
    } else {
      return [];
    }
  }

  render() {
    return (
      <Fragment>
        <div className="inf-scroll">
          {this.props.data ? (
            this.state.items.map((val) => {
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
            {this.state.hasMore ?
              <button className='infinite-list__load-more' onClick={this.fetchMoreData}>Load More</button>
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

export default InfiniteList
