import React, { useState, useEffect, Fragment } from 'react';
import {connect} from 'react-redux'
import axios from 'axios';
import Table from '../../core/Table';
import Loading from '../../core/LoadingScreen/Loading';
import './style.css';
import KpiBar from './KpiBar';
import FilterModal from '../../core/filterModal/FilterModal';
import RecommendationModal from './RecommendationModal';
import SaveFilterModal from './SaveFilterModal'
import Select from 'react-select'
import { array } from 'prop-types';
import {createErrorAlert} from '../../../actions/alert';



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

const Marketplace = ({createErrorAlert}) => {
  
  const [loading, setLoading] = useState(false)
  const [listings, setListings] = useState([])
  const [filterString, setFilterString] = useState('')
  const [filters, setFilters] = useState(undefined)
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [showRecommendationModal, setShowRecommendationModal] = useState(false)
  const [focusedProperty, setFocusedProperty] = useState(undefined)
  const [showSaveFilterModal, setShowSaveFilterModal] = useState(false);
  const [savedFilters, setSavedFilters] = useState([])
  const [selectedFilter, setSelectedFilter] = useState(undefined)

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
          <a className='marketplace__table-icon' onClick={() => startRecommendationFlow(item._id)}>
            <i className="fas fa-check"></i>
          </a>
          <a className='marketplace__table-icon' onClick={() => blacklistListing(item._id)}>
            <i className="fas fa-times"></i>
          </a>
        </div>
      )
    }
  ]

  const fetchData = async (cancelToken) => {
    setLoading(true)
    const res = await axios.get(`/api/sales/listings`, {cancelToken});
    const listings = res.data;
    setListings(listings)
    setLoading(false)
  }

  const fetchFilteredData = async (filters, blacklist) => {
    setLoading(true)
    const data = {filters, blacklist}
    const res = await axios.post(`/api/sales/listings/filter`, data);
    const listings = res.data.record;
    const appliedFilters = res.data.filters
    console.log(listings)
    setFilters(appliedFilters)
    setListings(listings)
    setLoading(false)
  }

  const fetchSavedFilters = async (cancelToken) => {
    const res = await axios.get(`/api/marketplace/ops/filters`, {cancelToken});
    const { filters } = res.data;
    const savedFiltersOptions = filters.map((filter) => ({label: filter.name, value: {filters: filter.filters, _id: filter._id, blacklist: filter.blacklist}}))
    setSavedFilters(savedFiltersOptions)
  }

  const submitFilterModal = async (selectedFilters) => {
    setSelectedFilter(undefined)
    fetchFilteredData(selectedFilters)
  }

  const clearFilter = () => {
    setFilters(undefined)
    fetchData()
  }

  const saveFilter = () => {
    setShowSaveFilterModal(true)
  }

  const startRecommendationFlow = (propertyId) => {
    setShowRecommendationModal(true)
    setFocusedProperty(propertyId)
  }

  const submitRecommendationModal = (buyers, customMessage) => {
    const data = {
      property: focusedProperty,
      buyers: buyers,
      customMessage: customMessage
    }
    axios.post('/api/marketplace/ops/recommend', data)
  }

  const submitSaveFilterModal = async (name) => {
    const data = {
      name,
      filters
    }
    await axios.post('/api/marketplace/ops/filters', data)
    fetchSavedFilters()
  }

  const handleFilterChange = (value) => {
    const {name, value: { filters, blacklist }} = value
    setSelectedFilter(value)
    fetchFilteredData(filters, blacklist)
  }

  const blacklistListing = (listingId) => {
    if(!selectedFilter) {
      createErrorAlert('You need to save the filter before blacklisting a property')
      return;
    } else {
      axios.post(`/api/marketplace/ops/filters/${selectedFilter.value._id}/blackList`, {listingId})
      const listingsBlacklisted = listings.filter((listing) => listing._id !== listingId)
      setListings(listingsBlacklisted)
    }
  }



  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    fetchData(source.token)
    fetchSavedFilters(source.token)
    return () => {
      source.cancel('Component unmounted');
    }
  },[])

  return loading ? <Loading /> : (
    <div>
      <KpiBar />
      <div>
      </div>
      <div className='searchContainer agentsSearchContainer'>
        <div style={{display: 'flex'}}>
          <Select
            className="marketplace__filter-select"
            onChange={handleFilterChange}
            defaultValue="All"
            options={savedFilters}
            placeholder='Select Filter'
            value={selectedFilter}
          />
          <input 
            className='form-control searchInput' 
            tabIndex={0}
            onChange={(e) => setFilterString(e.target.value)} 
            placeholder='Search' 
          />
        </div>
        <div className='marketplace__filter-icons'>
          {filters && !selectedFilter &&
            <Fragment>
              <button onClick={saveFilter}>Save filter</button>
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
      <RecommendationModal show={showRecommendationModal} handleClose={() => setShowRecommendationModal(false)} handleSubmit={submitRecommendationModal}/>
      <SaveFilterModal show={showSaveFilterModal} handleClose={() => setShowSaveFilterModal(false)} handleSubmit={submitSaveFilterModal}/>
    </div>
  )
}

export default connect(undefined, {createErrorAlert})(Marketplace)
