import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import IconButton from "../../../core/IconButton/IconButton";
import Table from '../../../core/newTable/_Table'

import {getShowcaseData} from '../../../../actions/marketplace/showcase'


const ShowcaseRecords = () => {

    const list = []

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

  //--- Bug Fix for filter Select CSS with Sticky Header ---//
  const [sticky, setSticky] = useState(true)
  
  useEffect(() => {
    setSticky(true)
  },[]) //run when main data filed is updated

  useEffect(() => {
    getShowcaseData();
  }, []);

 return(
    <div>
      <div>
        Showcase Deals
      </div>   
      
          <Table
            headers={headers}
            list = {list}
            // handleClickRow={startShowDetailFlow}
            sticky = {sticky}
          />  
    </div>
  )
}

const mapStateToProps = state => ({

})


export default connect(mapStateToProps, {})(ShowcaseRecords)

