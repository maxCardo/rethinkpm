import React, {useState, useEffect, Fragment, useRef} from 'react';
import {Form} from 'react-bootstrap'
import {connect} from 'react-redux'
import axios from 'axios';
import Table from '../../core/Table';
import IconButton from "../../core/IconButton/IconButton";
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
import DetailModal from './DetailModal'
import PropertyDetailsModal from "./PropertyDetailsModal";
import {useWindowSize} from "../../../util/commonFunctions";
import FullScreenTable from '../../core/FullScreenTable/FullScreenTable';
import {checkBoxCheck} from '../../../util/commonFunctions'
import FileDownload from 'js-file-download'

const FILTERFIELDS = {
  type: {
    type: {
      label: "Don't filter",
      value: "noFilter"
    },
    value: "",
    name: "Type",
    dataType: "array",
    accessor: "propertyType"
  },
  listAge: {
    type: {
      label: "Don't filter",
      value: "noFilter"
    },
    value: "",
    name: "List Age",
    dataType: "number",
    accessor: "listAge"
  },
  county: {
    type: {
      label: "Don't filter",
      value: "noFilter"
    },
    value: "",
    name: "County",
    dataType: "array",
    accessor: "county"
  },
  zip: {
    type: {
      label: "Don't filter",
      value: "noFilter"
    },
    value: "",
    name: "Zipcode",
    dataType: "array",
    accessor: "zipcode"
  },
  schoolDistrict: {
    type: {
      label: "Don't filter",
      value: "noFilter"
    },
    value: "",
    name: "School District",
    dataType: "array",
    accessor: "schoolDistrict"
  },
  listPrice: {
    type: {
      label: "Don't filter",
      value: "noFilter"
    },
    value: "",
    name: "Price",
    dataType: "number",
    accessor: "listPrice"
  },
  condition: {
    type: {
      label: "Don't filter",
      value: "noFilter"
    },
    value: "",
    name: "Condition",
    dataType: "array",
    accessor: "condition"
  },
  numberOfBedrooms: {
    type: {
      label: "Don't filter",
      value: "noFilter"
    },
    value: "",
    name: "Number of bedrooms",
    dataType: "number",
    accessor: "bedrooms"
  },
  numberOfBathrooms: {
    type: {
      label: "Don't filter",
      value: "noFilter"
    },
    value: "",
    name: "Number of bathrooms",
    dataType: "number",
    accessor: "totalBaths"
  },
  tract: {
    type: {
      label: "Don't filter",
      value: "noFilter"
    },
    value: "",
    name: "Tract",
    dataType: "string",
    accessor: "tract"
  },
  opZone: {
    type: {
      label: "Don't filter",
      value: "noFilter"
    },
    value: "",
    name: "OP Zone",
    dataType: "array",
    accessor: "opZone"
  },
  rentTier: {
    type: {
      label: "Don't filter",
      value: "noFilter"
    },
    value: "",
    name: "Rent Tier",
    dataType: "array",
    accessor: "rents.HA.tier"
  },
  zoning: {
    type: {
      label: "Don't filter",
      value: "noFilter"
    },
    value: "",
    name: "Zoning",
    dataType: "array",
    accessor: "zoning"
  },
}

// const FILTEROPTIONS = {
//   type: [
//     {value: 'res', label: 'Residential'}
//   ]
// }

const Marketplace = ({createErrorAlert, openStreetView}) => {

  const [loading, setLoading] = useState(false)
  const [listings, setListings] = useState([])
  const [filterString, setFilterString] = useState('')
  const [filters, setFilters] = useState(undefined)
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [showStreetViewModal, setShowStreetViewModal] = useState(true)
  const [showPropertyDetailsModal, setShowPropertyDetailsModal] = useState(false)
  const [showRecommendationModal, setShowRecommendationModal] = useState(false)
  const [focusedProperty, setFocusedProperty] = useState(undefined)
  const [showSaveFilterModal, setShowSaveFilterModal] = useState(false);
  const [savedFilters, setSavedFilters] = useState([])
  const [selectedFilter, setSelectedFilter] = useState(undefined)
  const [filterOptions, setFilterOptions] = useState({})
  const [showAddDataModal, setShowAddDataModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false) 
  const [version, setVersion] = useState(0)
  const [tablePageSize, setTablePageSize] = useState(10)
  const [iframeTarget, setIframeTarget] = useState('')
  const tableContainerHeight = useRef(null);
  const size = useWindowSize();

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
      accessor: 'listNumber',
      label: "MLS ID"
    },
    {
      accessor: 'listDate',
      label: 'List Date',
      mapper: 'date'
    },
    {
      accessor: "city",
      label: "Area"
    },
    {
      accessor: 'listPrice',
      label: 'List Price',
      mapper: 'money'
    },
    {
      reactComponent: true,
      label: "Address",
      render: (item) => (
        <div>
          <p>{item.streetNumber} {item.streetName}</p>
        </div>
      ),
      className: "Marketplace__address"
    },
    {
      label: 'Zip',
      accessor: 'zipcode'
    },
    {
      accessor: 'bedrooms',
      label: 'Bed'
    },
    {
      accessor: 'totalBaths',
      label: 'Bath'
    },
    {
      accessor: 'condition',
      label: 'Condition',
      mapper: (data) => conditionsMap[data]
    },
    {
      reactComponent: true,
      label: 'Actions',
      className: "Marketplace__actions",
      render: (item) => (
        <div>
          <IconButton placement='bottom'
                      tooltipContent='View property details'
                      id='property-details-tooltip'
                      iconClass='fas fa-list'
                      variant='action-button'
                      onClickFunc={() => {
                        setIframeTarget(`https://cardo.idxbroker.com/idx/details/listing/d504/${item.listNumber}`);
                        setShowPropertyDetailsModal(true);
                      }}
          />
          <IconButton placement='bottom'
                      tooltipContent='View On Site'
                      id='link-tooltip'
                      iconClass='fas fa-link'
                      variant='link'
                      href={`https://cardo.idxbroker.com/idx/details/listing/d504/${item.listNumber}`}
          />
          {(item.streetName && item.streetNumber) && (
            <IconButton placement='bottom'
                        tooltipContent='Open street view'
                        id='street-view-tooltip'
                        iconClass='fas fa-eye'
                        variant='action-button'
                        onClickFunc={() => openStreetView(item.streetName, item.streetNumber)}
            />)}
          <IconButton placement='bottom'
                      tooltipContent='Input Listing Data'
                      iconClass='fas fa-plus'
                      variant='action-button'
                      onClickFunc={() => startAddDataFlow(item)}
          />
          <IconButton placement='bottom'
            tooltipContent='Recommend Deal'
            iconClass='fas fa-star'
            variant='action-button'
            onClickFunc={() => startRecommendationFlow([item])}
          />
          <IconButton placement='bottom'
                      tooltipContent='Blacklist Deal'
                      iconClass='fas fa-trash'
                      variant='action-button'
            /*DEMO: change icon color, should be made with separate class with hover,
             focus etc states because it's a button, or even a separate variant if needed*/
                      btnClass='text-danger'
                      needsConfirmation={true}
                      onClickFunc={() => blacklistListing(item._id)}
          />
        </div>
      )
    }
  ]

  const [headers, setHeaders] = useState(HEADERS)
  const [checkFlowActive, setCheckFlowActive] = useState(false)
  let [checkFlowList, setCheckFlowList] = useState([])

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
    setFilterOptions(options)
  }

  const fetchFilteredData = async (filters, blacklist) => {
    setLoading(true)
    const data = {filters, blacklist}
    const res = await axios.post(`/api/marketplace/ops/listings/filter`, data);
    const listings = res.data.record;
    const appliedFilters = res.data.filters
    setFilters(appliedFilters)
    setListings(listings)
    setLoading(false)
  }

  const fetchSavedFilters = async (cancelToken) => {
    const res = await axios.get(`/api/marketplace/ops/filters`, {cancelToken});
    const {filters} = res.data;
    const savedFiltersOptions = filters.map((filter) => ({
      label: filter.name,
      value: {filters: filter.filters, _id: filter._id, blacklist: filter.blacklist}
    }))
    setSavedFilters(savedFiltersOptions)
  }

  const submitFilterModal = async (selectedFilters) => {
    setSelectedFilter(undefined)
    fetchFilteredData(selectedFilters).then(r => {})
  }

  const clearFilter = () => {
    setFilters(undefined)
    fetchData().then(r => {})
  }

  const saveFilter = () => {
    setShowSaveFilterModal(true)
  }

  const startRecommendationFlow = (properties) => {
    setFocusedProperty(properties.map(property => property._id))
    if(properties.length > 1) {
      setShowRecommendationModal(true)
    } else {
      if(properties[0].condition) {
        setShowRecommendationModal(true)
      } else {
        createErrorAlert('For recommend the property please add the condition of it')
        setFocusedProperty(properties[0])
        setShowAddDataModal(true)
      }
    }
  }

  const startAddDataFlow = (property) => {
    setFocusedProperty(property)
    setShowAddDataModal(true)
  }

  const submitRecommendationModal = (buyers, customMessage) => {
    const data = {
      properties: focusedProperty,
      buyers: buyers,
      customMessage: customMessage
    }
    axios.post('/api/marketplace/ops/recommend', data).then(r => {})
  }

  const submitSaveFilterModal = async (name) => {
    const data = {
      name,
      filters
    }
    await axios.post('/api/marketplace/ops/filters', data)
    fetchSavedFilters().then(r => {})
  }
  const submitAddDataModal = async (conditionObject, numUnits) => {
    const condition = conditionObject.value;
    const data = {
      condition,
      numUnits
    }
    const newListings = listings.map((listing) => {
      if (listing._id === focusedProperty._id) {
        listing.condition = condition
        listing.numUnits = numUnits
      } 
      return listing
    })
    setListings(newListings)
    await axios.post(`/api/marketplace/ops/listings/${focusedProperty._id}/addData`, data)
  }

  const handleFilterChange = (value) => {
    const {value: {filters, blacklist}} = value
    setSelectedFilter(value)
    fetchFilteredData(filters, blacklist).then(r =>{}).catch(e => {})
  }

  const blacklistListing = (listingId) => {
    if (!selectedFilter) {
      createErrorAlert('You need to save the filter before blacklisting a property')
      return;
    } else {
      axios.post(`/api/marketplace/ops/filters/${selectedFilter.value._id}/blackList`, {listingId}).then(r => {})
      const listingsBlacklisted = listings.filter((listing) => listing._id !== listingId)
      setListings(listingsBlacklisted)
    }
  }

  const startShowDetailFlow = (item) => {
    setFocusedProperty(item)
    setShowDetailModal(true)
  }

  const addUnitSchedule = async (unit) => {
    const listingId = focusedProperty._id;
    const data = {
      unit
    }
    const listingUpdated = (await axios.post(`/api/marketplace/ops/listings/${listingId}/addUnitSch`, data)).data
    const newListings = listings.map((listing) => {
      if(listing._id === listingUpdated._id) {
        return listingUpdated
      } else {
        return listing
      }
    })
    setListings(newListings)
    setVersion(version+1)
  }

  //EFFECT:  Redraw table on window resize
  useEffect(() => {

    const populateTable = () => {
      const CancelToken = axios.CancelToken;
      const source = CancelToken.source();
      fetchData(source.token).then(r => {})
      loadFilterOptions(source.token).then(r => {})
      fetchSavedFilters(source.token).then(r => {})
      return () => {
        source.cancel('Component unmounted');
      }
    }

    if(!listings.length) {
      populateTable()
    }
  const checkFlowListingToggle = (listing, checked) => {
    let newCheckFlowList;
    if(checked) {
      newCheckFlowList = [...checkFlowList, listing] 
    } else {
      newCheckFlowList = checkFlowList.filter((listingInList) => {
        return listingInList._id !== listing._id
      })
    }
    checkFlowList = newCheckFlowList
    setCheckFlowList(newCheckFlowList)
  }


  const toggleCheckFlow = () => {
    const newHeaders = [...headers]
    if(!checkFlowActive) {
      newHeaders.unshift({
        reactComponent: true,
        label: 'Checked',
        render: (item) => (
          <div className="element-wrapper with--checkbox">
            <label className="checkbox path" checked={true}  >
              <input type="checkbox" name='useFilter' defaultChecked={false} onChange={e => checkFlowListingToggle(item, e.target.checked)}/>
              {checkBoxCheck()}
            </label>
          </div>
        )
      })
    } else {
      newHeaders.shift()
      setCheckFlowList([])
    }
    setCheckFlowActive(!checkFlowActive)
    setHeaders(newHeaders)
  }

  const exportCsv = async () => {
    const res = await axios.post(`/api/marketplace/ops/exportCsv`, {list: checkFlowList})
    FileDownload(res.data, 'export.csv')
  }

  const recommendBatch = () => {
    for(let listing of checkFlowList) {
      if(!listing.condition) {
        createErrorAlert('One or more properties are missing the condition')
        return;
      }
    }
    startRecommendationFlow(checkFlowList)
  }



  return loading ? <Loading /> : (
    <div className="tableWithActions">
      <KpiBar />

    const height = size.height;
    // 360 is sum of all heights of everything else that takes vertical space outside the container
    const controlHeight = height - 360;
    let rowNumber;
    if (height) {
      // 43 is height of row
      rowNumber = Math.floor(controlHeight / 43);
    } else {
      rowNumber = 10;
    }
    if(tablePageSize !== rowNumber) {
      if ((tableContainerHeight.current > controlHeight) && (tableContainerHeight.current - 50 > controlHeight)) {
        setTablePageSize(rowNumber)
        setVersion(version+1)
        tableContainerHeight.current = controlHeight;
      } else if ((tableContainerHeight.current < controlHeight) && (tableContainerHeight.current + 50 < controlHeight)) {
        setTablePageSize(rowNumber)
        setVersion(version+1)
        tableContainerHeight.current = controlHeight;
      } else {
        console.log('effect did nothing')
      }
    }

  }, [size.height]); // Empty array ensures that effect is only run on mount


  return loading ? <Loading/> : (
    <div className="tableWithActions marketplace" style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
      <KpiBar/>

      <div style={{flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column'}}>
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
            {
              checkFlowActive &&
                <Fragment>
                  <button onClick={exportCsv}>
                    <i className="fas fa-file-csv"></i>
                  </button>
                  <button onClick={recommendBatch}>
                    <i className="fas fa-star"></i>
                  </button>
                </Fragment>
            }
            <button onClick={toggleCheckFlow}>
              <i className="fas fa-check-square"></i>
            </button>
          </div>

        </div>
        <div className="container-fluid" style={{overflow: 'auto', display: 'flex', flexDirection:'column', flex: 1}}>
          <div className="col-12 p-0 containerTable" id='' style={{display: 'flex', flexDirection: 'column', flex: 1}}>
            <FullScreenTable
              pageSize={tablePageSize}
              sorting={true}
              fontSize={12}
              filter={filterString}
              data={listings}
              headers={headers}
              sortBy="listDate"
              sortDirection='desc'
              version={version}
              onClickRow={(item) => startShowDetailFlow(item)}
            />
            Number of records: {listings.length}
          </div>
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
      <PropertyDetailsModal iframeTarget={iframeTarget} show={showPropertyDetailsModal}
                          handleClose={() => setShowPropertyDetailsModal(false)}/>
      <RecommendationModal show={showRecommendationModal} handleClose={() => setShowRecommendationModal(false)} handleSubmit={submitRecommendationModal}/>
      <SaveFilterModal show={showSaveFilterModal} handleClose={() => setShowSaveFilterModal(false)} handleSubmit={submitSaveFilterModal}/>
      <AddDataModal show={showAddDataModal} handleClose={() => setShowAddDataModal(false)} property={focusedProperty}
                    handleSubmit={submitAddDataModal}/>
      <DetailModal show={showDetailModal} data={focusedProperty} handleClose={() => setShowDetailModal(false)} addUnitSchedule={addUnitSchedule}/>
    </div>
  )
}


export default connect(undefined, {createErrorAlert, openStreetView})(Marketplace)
