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
        accessor: "propertyType",
        label: "Type"
      },
      {
        accessor: "county",
        label: "Area"
      },
      {
        accessor: "streetName",
        label: "Address"
      },
      {
        accessor: 'listPrice',
        label: 'List Price',
        mapper: 'money'
      },
      {
        accessor: 'bedrooms',
        label: 'Bedrooms'
      },
      {
        accessor: 'bathsFull',
        label: 'Full Bath'
      },
      {
        accessor: 'bathsPartial',
        label: 'Partial Bath'
      },
      {
        reactComponent: true,
        label: 'Actions',
        render: (item) => (
          <div>
            <a href={`http://cardo.idxbroker.com/idx/details/listing/d504/${item.listNumber}`} target= "_blank">
              <i class="fas fa-link"></i>
            </a>
            <a>
              <i class="fas fa-plus"></i>
            </a>
            <a>
              <i class="fas fa-check"></i>
            </a>
            <a>
              <i class="fas fa-adjust"></i>
            </a>
            <a>
              <i class="fas fa-times"></i>
            </a>
          </div>
        )
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
