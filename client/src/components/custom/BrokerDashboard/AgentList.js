import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {SET_AGENT_OPPORTUNITIES} from '../../../actions/type';
import axios from 'axios';
import Select from "react-select";
import {agentStatus} from "../../../util/statusSchemas";
import {filterData} from "../../../util/commonFunctions";
import InfiniteScroll from "react-infinite-scroll-component";


class AgentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      agentStatusSelect: agentStatus,
      data: [],
      filterString: '',
      statusSelected: {label: 'All', value: 'all'},
      hasMore: true,
      items: []
    };
  }

  fetchMoreData = () => {
    if (this.state.items.length >= this.state.data.length) {
      this.setState({ hasMore: false });
      return;
    }
    let theNewItems = [];
    this.state.data.forEach((dataItem) => {
        if ((this.state.items.indexOf(dataItem) === -1) && theNewItems.length < 20) {
          theNewItems.push(dataItem);
        }
    });
    setTimeout(() => {
      this.setState({
        items: this.state.items.concat(theNewItems),
        hasMore: true
      });
    }, 500);
  }

  moneyFormat(sum) {
    return (new Intl.NumberFormat('en-US',
      {style: 'currency', currency: 'USD'}
    ).format(sum))
  }

  getItemsFromData(data) {
    if (data.length >= 20) {
      return data.slice(0,20);
    } else if (data.length > 0) {
      return data.slice(0,data.length);
    } else {
      return [];
    }
  }

  refreshFunction(data) {
    return data;
  }

  componentDidMount() {
    axios.get('/api/sales/agents').then((res) => {
      let agentsWithSales = res.data.filter((agent) => agent.sales > 0);
      this.props.setAgents({agentOpportunities: agentsWithSales, agentOpportunitiesRaw: res.data});
      this.setState({data: agentsWithSales, items: this.getItemsFromData(agentsWithSales)});
    })
      .then((res) => {
        this.setState({loadingAgents: false});
      });

  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    let filteredAgents = [];
    let filteredTwice = [];
    const agentsAll = (prevProps.allAgents) ? prevProps.allAgents : this.props.allAgents;

    if ((prevState.statusSelected !== this.state.statusSelected) || (prevState.filterString !== this.state.filterString)) {
      this.setState({loading: true});

      if (this.state.statusSelected.value !== 'all') {
        agentsAll.forEach((agent) => {
          if (agent.status == this.state.statusSelected.value && agent.sales > 0 ) {
            filteredAgents.push(agent);
          }
        });
      } else {
        filteredAgents = agentsAll;
      }

        filteredAgents.forEach((agent) => {
          const name = agent.firstName;
          const lastName = agent.lastName;
          const fullName = (name + ' ' + lastName).toLowerCase();

          if (fullName.includes(this.state.filterString.toLowerCase())) {
            filteredTwice.push(agent);
          }
        });

      console.log(filteredTwice);

      let hasMore = false;
      if (filteredTwice.length > this.getItemsFromData(filteredTwice).length) {
        hasMore = true;
      }

      this.setState({data: filteredTwice, items: this.getItemsFromData(filteredTwice), loading: false, hasMore: hasMore});
    }
    this.refreshFunction(this.state.items);
  }

  render() {
    return (
      <Fragment>
        <Select
          className="agentStatusFilter"
          onChange={value => this.setState({statusSelected: value})}
          defaultValue="All"
          options={this.state.agentStatusSelect}
          placeholder='Select Status'
        />
        <div className="list__search-container">
          <input
            className='form-control searchInput'
            tabIndex={0}
            onChange={(e) => this.setState({filterString: e.target.value})}
            placeholder='Search'
          />
        </div>
        <InfiniteScroll
          className="inf-scroll"
          ref={this.infiniteScroll}
          dataLength={this.state.items.length}
          next={this.fetchMoreData}
          hasMore={this.state.hasMore}
          loader={<p>Loading...</p>}
          height={'76vh'}
          endMessage={
            <p style={ {textAlign: "center"} }>No more results!</p>
          }>
          {this.state.items ? (
            this.state.items.map((val, idx) => {
              if (val.sales > 0) {
                return <div key={val._id}>
                  <Link to={`/profile/agent/${val._id}`}>
                    <div className="list__picker-header"><span>{val.firstName} {val.lastName}</span> <span
                      className="label__gray">{val.status}</span></div>
                    <div className="list__picker-body">
                      <span>skills status</span><span>{this.moneyFormat(val.sales)}</span>
                    </div>
                  </Link>
                </div>
              }
            })) : ''}
        </InfiniteScroll>

      </Fragment>

    );
  }
}

const mapStateToProps = state => ({
  allAgents: state.brokerDashboard.agentOpportunitiesRaw
});

const mapDispatchToProps = dispatch => {
  return {
    setAgents: (agents) => dispatch({type: SET_AGENT_OPPORTUNITIES, payload: agents})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AgentList);