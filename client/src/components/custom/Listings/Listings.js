import React, { Component } from 'react'
import axios from 'axios';
import Table from '../../core/Table'
import Loading from '../../core/LoadingScreen/Loading';

export class Listings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
    this.headers = [
      {
        accessor: "listNumber",
        label: "List Number"
      },
      {
        accessor: "streetNumber",
        label: "Street Number"
      },
      {
        accessor: "streetName",
        label: "Street Name"
      },
      {
        accessor: "zipcode",
        label: "Zipcode"
      },
      {
        accessor: "city",
        label: "City"
      },
      {
        accessor: "county",
        label: "County"
      },
      {
        accessor: "state",
        label: "State"
      },
      {
        accessor: 'bedrooms',
        label: 'Bedroooms',
      },
      {
        accessor: 'listDate',
        label: 'List Date',
        mapper: 'date'
      },
      {
        accessor: 'listPrice',
        label: 'List Price',
        mapper: 'money'
      }
    ]
  }
  async componentDidMount() {
    this.setState({loading: true});
    const res = await axios.get(`/api/sales/listings`);
    const listings = res.data;
    this.setState({listings, loading: false});
  }
  render() {
    return this.state.loading ? <Loading /> : (
      <div>
        <div className='searchContainer agentsSearchContainer'>
          <input 
            className='form-control searchInput' 
            tabIndex={0}
            onChange={(e) => this.setState({filterString: e.target.value})} 
            placeholder='Search' 
          />
        </div>
        <div className="container-fluid" style={{overflow: 'auto', maxHeight: '80vh'}}>
          <div className="col-12" >
            <Table 
              pageSize={10}
              sorting={true}
              fontSize={12}
              filter={this.state.filterString}
              data={this.state.listings}
              headers={this.headers}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Listings
