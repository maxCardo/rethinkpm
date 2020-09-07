import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import Table from '../../core/Table';
import Loading from '../../core/LoadingScreen/Loading';
import './style.css';
import KpiBar from './KpiBar';
import FilterModal from '../../core/filterModal/FilterModal';
import StreetViewModal from "./StreetViewModal";

const HEADERS = [
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
    accessor: "streetNumber",
    label: "streetNumber"
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
        <a className='marketplace__table-icon' href={`http://cardo.idxbroker.com/idx/details/listing/d504/${item.listNumber}`} target= "_blank">
          <i className="fas fa-link"></i>
        </a>
        <a className='marketplace__table-icon'>
          <i className="fas fa-plus"></i>
        </a>
        <a className='marketplace__table-icon'>
          <i className="fas fa-check"></i>
        </a>
        <a className='marketplace__table-icon'>
          <i className="fas fa-adjust"></i>
        </a>
        <a className='marketplace__table-icon'>
          <i className="fas fa-times"></i>
        </a>
      </div>
    )
  }
]

const FILTERFIELDS = {
  type: {
    type: { 
      label: "Don't filter", 
      value: "noFilter"
    }, 
    value:"" , 
    name: "Type", 
    dataType:"array", 
    accessor:"type"
  },
  numberOfBedrooms: {
    type: { 
      label: "Don't filter", 
      value: "noFilter"
    }, 
    value:"" , 
    name: "Number of bedrooms", 
    dataType:"number", 
    accessor:"bedrooms"
  },
  numberOfBathrooms: {
    type: { 
      label: "Don't filter", 
      value: "noFilter"
    }, 
    value:"" , 
    name: "Number of bathrooms", 
    dataType:"number", 
    accessor:"bathsFull"
  },
  zipcode: {
    type: { 
      label: "Don't filter", 
      value: "noFilter"
    }, 
    value:"" , 
    name: "Zipcode", 
    dataType:"array", 
    accessor:"zipcode"
  },
}

const FILTEROPTIONS = {
  type : [
    {value: 'res', label: 'Residential'}
  ]
}

const Marketplace = () => {
  
  const [loading, setLoading] = useState(false)
  const [listings, setListings] = useState([])
  const [filterString, setFilterString] = useState('')
  const [filters, setFilters] = useState(undefined)
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [showStreetViewModal, setShowStreetViewModal] = useState(true)

  const fetchData = async (cancelToken) => {
    setLoading(true)
    const res = await axios.get(`/api/sales/listings`, {cancelToken});
    const listings = res.data;
    setListings(listings)
    setLoading(false)
  }

  const submitFilterModal = async (selectedFilters) => {
    setLoading(true)
    const data = {
      filters: selectedFilters,
    }
    const res = await axios.post(`/api/sales/listings/filter`, data);
    const listings = res.data.record;
    const filters = res.data.filters
    console.log(listings)
    setFilters(filters)
    setListings(listings)
    setLoading(false)
  }

  const clearFilter = () => {
    setFilters(undefined)
    fetchData()
  }



  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    fetchData(source.token)
    return () => {
      source.cancel('Component unmounted');
    }
  },[])

  return loading ? <Loading /> : (
    <div>
      <KpiBar />
      <div className='searchContainer agentsSearchContainer'>
        <input 
          className='form-control searchInput' 
          tabIndex={0}
          onChange={(e) => setFilterString(e.target.value)} 
          placeholder='Search' 
        />
        <div className='marketplace__filter-icons'>
          {filters &&
            <Fragment>
              <button onClick={() => {}}>Save filter</button>
              <button onClick={clearFilter}>Clear filter</button>
            </Fragment>
          }
          <button onClick={() => setShowFilterModal(true)}>
            <i className="fas fa-filter"></i>
          </button>
        </div>
        
      </div>
      <div className="container-fluid" style={{overflow: 'auto', maxHeight: '80vh'}}>
        <div className="col-12" >
          <Table 
            pageSize={10}
            sorting={true}
            fontSize={12}
            filter={filterString}
            data={listings}
            headers={HEADERS}
          />
        </div>
      </div>
      <FilterModal 
        show={showFilterModal} 
        filterFields={FILTERFIELDS} 
        options={FILTEROPTIONS} 
        handleClose={() => setShowFilterModal(false)}
        onSubmit={submitFilterModal}
      />
      <StreetViewModal
          show={showStreetViewModal}
          handleClose={() => setShowStreetViewModal(false)}
          apiKey="AIzaSyCvc3X9Obw3lUWtLhAlYwnzjnREqEA-o3o" />
    </div>
  )
}

export default Marketplace
