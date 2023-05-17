import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import IconButton from "../../../core/IconButton/IconButton";
import Table from '../../../core/newTable/_Table'
import Loading from '../../../core/LoadingScreen/Loading';
import DetailModal from '../DetailModal'
import PropertyDetailsModal from '../PropertyDetailsModal';

import {getShowcaseData, unflag} from '../../../../actions/marketplace/showcase'


const ShowcaseRecords = ({getShowcaseData, unflag,  showcase: {list, loading}}) => {

  //---------- Data Maps --------------//
  const headers = [
    {
      accessor: "deal_id.propertyType",
      label: "useCode"
    },
    {
      accessor: "deal_id.city",
      label: "Area"
    },
    {
      reactComponent: true,
      label: "Address",
      render: (item) => (
          <div>
            <p>{item.deal_id.streetNumber} {item.deal_id.streetName}</p>
          </div>
      ),
      className: "Marketplace__address"
    },
    {
      label: 'Zip',
      accessor: 'deal_id.zipcode'
    },
    {
      accessor: 'deal_id.bedrooms',
      label: 'Bed'
    },
    {
      accessor: 'deal_id.totalBaths',
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
                          setIframeTarget(`https://fifthgrant.idxbroker.com/idx/details/listing/d504/${item.deal_id.listNumber}`);
                          setShowPropertyDetailsModal(true);
                        }}
            />
            {/* <IconButton placement='bottom'
                        tooltipContent='View On Site'
                        id='link-tooltip'
                        iconClass='fas fa-link'
                        variant='link'
                        href={`https://fifthgrant.idxbroker.com/idx/details/listing/d504/${item.listNumber}`}
            /> */}
            
            {/* <IconButton placement='bottom'
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
            /> */}
            <IconButton placement='bottom'
                        tooltipContent='Blacklist Deal'
                        iconClass='fas fa-trash'
                        variant='action-button'
                        btnClass='text-danger'
                        //needsConfirmation={true}
                        onClickFunc={() => unflag(item._id)}
            />
          </div>
      )
    }
  ]

  //--- Bug Fix for filter Select CSS with Sticky Header ---//
  const [sticky, setSticky] = useState(true)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [focusedProperty, setFocusedProperty] =  useState()
  const [showPropertyDetailsModal, setShowPropertyDetailsModal] = useState(false)
  const [iframeTarget, setIframeTarget] = useState('')
  
  // useEffect(() => {
  //   setSticky(true)
  // },[]) //run when main data filed is updated

  useEffect(() => {
    getShowcaseData();
  }, []);

  
  const startShowDetailFlow = (item) => {
    console.log('item');
    console.log(item.deal_id);
    setFocusedProperty(item.deal_id)
    //setLoading(true)
    setShowDetailModal(true)
    //setLoading(false)
  }

 return loading ? (
  <Loading />
 ) : (
    <div>
      <div>
        Showcase Deals
      </div>   
      
          <Table
            headers={headers}
            list = {list}
            handleClickRow={startShowDetailFlow}
            sticky = {sticky}
          />
          <DetailModal 
            show={showDetailModal} 
            data={focusedProperty} 
            handleClose={() => setShowDetailModal(false)} 
          />
          <PropertyDetailsModal 
            iframeTarget={iframeTarget} 
            show={showPropertyDetailsModal}
            handleClose={() => setShowPropertyDetailsModal(false)}
          />  
    </div>
  )
}

const mapStateToProps = state => ({
  showcase: state.showcase
})


export default connect(mapStateToProps, {getShowcaseData, unflag})(ShowcaseRecords)

