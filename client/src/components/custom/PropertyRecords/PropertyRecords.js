import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'

import IconButton from "../../core/IconButton/IconButton";
import FilterWrapper from '../../core/filterWrapper/FilterWrapper'
import Table from '../../core/newTable/_Table'


const PropertyRecords = ({filteredData: {count, list, savedFilters, activeFilter, selected}, removeItem, setAlert, exportCSV}) => {

  //---------- Data Maps --------------//
  const headers = [
    {
      accessor: "propertyType",
      label: "useCode"
    },
    {
      accessor: "city",
      label: "Area"
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
      reactComponent: true,
      label: 'Actions',
      className: "Marketplace__actions",
      render: (item) => (
          <div style={{display: 'flex'}}>
            <IconButton placement='bottom'
                        tooltipContent='View property details'
                        id='property-details-tooltip'
                        iconClass='fas fa-list'
                        variant='action-button'
                        onClickFunc={() => {
                          //setIframeTarget(`https://fifthgrant.idxbroker.com/idx/details/listing/d504/${item.listNumber}`);
                          //setShowPropertyDetailsModal(true);
                        }}
            />
            {/* <IconButton placement='bottom'
                        tooltipContent='View On Site'
                        id='link-tooltip'
                        iconClass='fas fa-link'
                        variant='link'
                        href={`https://fifthgrant.idxbroker.com/idx/details/listing/d504/${item.listNumber}`}
            /> */}
            
            <IconButton placement='bottom'
                        tooltipContent='Input Listing Data'
                        iconClass='fas fa-plus'
                        variant='action-button'
                        //onClickFunc={() => startAddDataFlow(item)}
            />
            <IconButton placement='bottom'
                        tooltipContent='Recommend Deal'
                        iconClass='fas fa-star'
                        variant='action-button'
                        //onClickFunc={() => startRecommendationFlow([item])}
            />
            <IconButton placement='bottom'
                        tooltipContent='Blacklist Deal'
                        iconClass='fas fa-trash'
                        variant='action-button'
                        btnClass='text-danger'
                        needsConfirmation={true}
                        //onClickFunc={() => setPropertyToBlackList(item._id)}
            />
          </div>
      )
    }
  ]

  const FILTERFIELDS = {

    
    //TODO: zipcodes did not upload into data set properly will fix issues on the data set in the future
    // Zipcode: {
    //   type: {
    //     label: "Don't Filter",
    //     value: "noFilter"
    //   },
    //   value: "",
    //   name: "Zipcode",
    //   dataType: "array",
    //   accessor: "zipcode"
    // },
    //ToDo: can not sort by date with current component, can adjust data set to number (age of ownership) or adjust component to allow for date filtering
    // lastSoldDate: {
    //   type: {
    //     label: "Don't Filter",
    //     value: "noFilter"
    //   },
    //   value: "",
    //   name: "Last Sold Date",
    //   dataType: "date",
    //   accessor: "saleDate"
    // },
    lastSoldPrice: {
      type: {
        label: "Don't Filter",
        value: "noFilter"
      },
      value: "",
      name: "Last Sale Price",
      dataType: "number",
      accessor: "salePrice"
    },
    sqft: {
      type: {
        label: "Don't Filter",
        value: "noFilter"
      },
      value: "",
      name: "Square Footage",
      dataType: "number",
      accessor: "sqft"
    },
    bedrooms: {
      type: {
        label: "Don't Filter",
        value: "noFilter"
      },
      value: "",
      name: "Number of Bedrooms",
      dataType: "number",
      accessor: "bedrooms"
    },
    ownerType: {
      type: {
        label: "Don't Filter",
        value: "noFilter"
      },
      value: "",
      name: "Owner Type",
      dataType: "array",
      accessor: "ownerCode",
      dependency: 'sector'
    },
    homestead: {
      type: {
        label: "Don't Filter",
        value: "noFilter"
      },
      value: "",
      name: "Homestead",
      dataType: "array",
      boolean: true,
      accessor: "homestead"
    },
    useCode: {
      type: {
        label: "Don't Filter",
        value: "noFilter"
      },
      value: "",
      name: "useCode",
      dataType: "array",
      accessor: "useCode"
    },
    SchoolDistrict: {
      type: {
        label: "Don't Filter",
        value: "noFilter"
      },
      value: "",
      name: "School District",
      dataType: "array",
      accessor: "schoolDistrict"
    },
    Area: {
      type: {
        label: "Don't Filter",
        value: "noFilter"
      },
      value: "",
      name: "Area",
      dataType: "array",
      accessor: "municipality"
    },


  }


  //--- Bug Fix for filter Select CSS with Sticky Header ---//
  const [sticky, setSticky] = useState(true)
  useEffect(() => {
    setSticky(true)
  },[]) //run when main data filed is updated
    
  return (
      <FilterWrapper
          dataModel='propertyRecord'
          filterFields={FILTERFIELDS}
          filterActive = {() => setSticky(!sticky)}
      >
      <div>
        Number of Records: {count}
      </div>   
      
          <Table
            headers={headers}
            list = {list}
            // handleClickRow={startShowDetailFlow}
            sticky = {sticky}
          />    
      </FilterWrapper>
  )
}

const mapStateToProps = state => ({
    filteredData: state.filteredData
})


export default connect(mapStateToProps, {})(PropertyRecords)

