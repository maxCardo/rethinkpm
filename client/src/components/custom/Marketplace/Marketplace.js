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
import {createErrorAlert} from '../../../actions/alert';
import AddDataModal from './AddDataModal';
import StreetViewModal from "./StreetViewModal";
import {openStreetView} from "../../../actions/marketplace";

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
  zip: {
    type: {
      label: "Don't filter",
      value: "noFilter"
    },
    value:"" ,
    name: "Zipcode",
    dataType:"array",
    accessor:"zipcode"
  },
  area: {
    type: {
      label: "Don't filter",
      value: "noFilter"
    },
    value:"" ,
    name: "Area",
    dataType:"array",
    accessor:"area"
  },
}

const FILTEROPTIONS = {
  type : [
    {value: 'res', label: 'Residential'}
  ]
}


const Marketplace = ({createErrorAlert, openStreetView}) => {
  
  const [loading, setLoading] = useState(false)
  const [listings, setListings] = useState([])
  const [filterString, setFilterString] = useState('')
  const [filters, setFilters] = useState(undefined)
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [showStreetViewModal, setShowStreetViewModal] = useState(true)
  const [showRecommendationModal, setShowRecommendationModal] = useState(false)
  const [focusedProperty, setFocusedProperty] = useState(undefined)
  const [showSaveFilterModal, setShowSaveFilterModal] = useState(false);
  const [savedFilters, setSavedFilters] = useState([])
  const [selectedFilter, setSelectedFilter] = useState(undefined)
  const [filterOptions, setFilterOptions] = useState(FILTEROPTIONS)
  const [showAddDataModal, setShowAddDataModal] = useState(false)

  const conditionsMap = {
    1: 'D',
    2: 'C',
    3: 'B',
    4: 'A'
  }

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
      accessor: 'condition',
      label: 'Condition',
      mapper: (data) => conditionsMap[data]
    },
    {
      reactComponent: true,
      label: 'Actions',
      render: (item) => (
        <div>
          <a className='action-buttons__button ' href={`http://cardo.idxbroker.com/idx/details/listing/d504/${item.listNumber}`} target= "_blank" rel="noopener noreferrer">
            <i className="fas fa-link"></i>
          </a>
          <button className='action-buttons__button ' onClick={() => startAddDataFlow(item._id)}>
            <i className="fas fa-plus"></i>
          </button>
          <button className='action-buttons__button ' onClick={() => startRecommendationFlow(item)}>
            <i className="fas fa-check"></i>
          </button>
          <button className='action-buttons__button ' onClick={() => blacklistListing(item._id)}>
            <i className="fas fa-times"></i>
          </button>
          {(item.streetName && item.streetNumber) && (
              <button className='action-buttons__button ' onClick={() =>  openStreetView(item.streetName, item.streetNumber)}>
                <i className="fas fa-eye" />
              </button>)}
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

  const loadFilterOptions = async (cancelToken) => {
    const res = await axios.get(`/api/marketplace/ops/filterOptions`, {cancelToken});
    const options = res.data
    setFilterOptions(Object.assign({}, filterOptions, options))
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

  const startRecommendationFlow = (property) => {
    setFocusedProperty(property._id)
    if(property.condition) {
      setShowRecommendationModal(true)
    } else {
      createErrorAlert('For recommend the property please add the condition of it')
      setShowAddDataModal(true)
    }
    
  }

  const startAddDataFlow = (propertyId) => {
    setShowAddDataModal(true)
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
  const submitAddDataModal = async (condition) => {
    const data = {
      condition
    }
    const newListings = listings.map((listing) => {
      if(listing._id === focusedProperty) {
        listing.condition = condition
      } 
      return listing
    })
    setListings(newListings)
    await axios.post(`/api/marketplace/ops/listings/${focusedProperty}/addCondition`, data)
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
    loadFilterOptions(source.token)
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
        <div className="col-12 p-0" >
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
        options={filterOptions} 
        handleClose={() => setShowFilterModal(false)}
        onSubmit={submitFilterModal}
      />
      <StreetViewModal
          show={showStreetViewModal}
          handleClose={() => setShowStreetViewModal(false)}
          apiKey="AIzaSyCvc3X9Obw3lUWtLhAlYwnzjnREqEA-o3o" />
      <RecommendationModal show={showRecommendationModal} handleClose={() => setShowRecommendationModal(false)} handleSubmit={submitRecommendationModal}/>
      <SaveFilterModal show={showSaveFilterModal} handleClose={() => setShowSaveFilterModal(false)} handleSubmit={submitSaveFilterModal}/>
      <AddDataModal show={showAddDataModal} handleClose={() => setShowAddDataModal(false)} handleSubmit={submitAddDataModal} />
    </div>
  )
}


export default connect(undefined, {createErrorAlert, openStreetView})(Marketplace)
