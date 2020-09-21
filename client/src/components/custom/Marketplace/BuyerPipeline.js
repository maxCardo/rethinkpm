import React, { useState, useEffect} from 'react';
import {connect} from 'react-redux'
import Table from '../../core/Table';
import Loading from '../../core/LoadingScreen/Loading';
import './style.css';
import StreetViewModal from "./StreetViewModal";
import {openStreetView,syncManagedBuyer,getBuyerPipeline,trashProperty,likeProperty} from "../../../actions/marketplace";
import {Tooltip, OverlayTrigger, Button} from "react-bootstrap";
import IconButton from "../../core/IconButton/IconButton";


const BuyerPipeline = ({openStreetView, profile, getBuyerPipeline, trashProperty, likeProperty, pipeline:{buyerPipeline, loading}}) => {

  const [showStreetViewModal, setShowStreetViewModal] = useState(true)

  const HEADERS = [
    {
      accessor: "status",
      label: "Status"
    },
    {
      accessor: "deal.propertyType",
      label: "Type"
    },
    {
      accessor: "deal.county",
      label: "Area"
    },
    {
      accessor: 'deal.listPrice',
      label: 'List Price',
      mapper: 'money'
    },
    {
      reactComponent: true,
      label: "Address",
      render: (item) => (
        <div>
          <p>{item.deal.streetNumber} {item.deal.streetName}</p>
        </div>
      )
    },

    {
      accessor: 'deal.bedrooms',
      label: 'Bedrooms'
    },
    {
      accessor: 'deal.totalBaths',
      label: 'Bathrooms'
    },
    {
      reactComponent: true,
      label: 'Actions',
      render: (item) => {
        return (
          <div>
            <IconButton placement='bottom'
              tooltipContent='Like for buyer'
              id='link-tooltip'
              iconClass='fas fa-link'
              variant='link'
              href={`http://cardo.idxbroker.com/idx/details/listing/d504/${item.deal.listNumber}`} />
            {(item.deal.streetName && item.deal.streetNumber) && (
              <IconButton placement='bottom'
                tooltipContent='Open street view'
                id='street-view-tooltip'
                iconClass='fas fa-eye'
                variant='action-button'
                onClickFunc={() => openStreetView(item.deal.streetName, item.deal.streetNumber)} />
            )}
            {item.status && (
              <IconButton placement='bottom'
                tooltipContent='Like for buyer'
                id='like-tooltip'
                iconClass='fas fa-heart'
                variant='action-button'
                onClickFunc={() => likeProperty(profile._id, item.deal._id)} />
            )}  
            <IconButton placement='bottom'
              tooltipContent='Trash property from pipeline'
              id='trash-property-tooltip'
              iconClass='fas fa-trash'
              variant='action-button'
              onClickFunc={() => trashProperty(profile._id, item.deal._id)} />
          </div>
        )
      }
    }
  ]

  useEffect(() => {
    getBuyerPipeline(profile._id)
  },[profile])


  return loading ? (
    <Loading />
  ) : (
    <div className='tableWithActions'>
      <div
        className='container-fluid'
        style={{ overflow: 'auto', maxHeight: '80vh' }}
      >
        <div className='ManageBuyers-actions'>
            <IconButton placement='bottom'
                        tooltipContent='Open buyer list'
                        id='list-tooltip'
                        iconClass='fas fa-list'
                        variant='transparent'
                        onClickFunc={() => console.log('show buyer list for agent')} />
            <IconButton placement='right'
                        tooltipContent='Get fresh data'
                        id='sync-tooltip'
                        iconClass='fas fa-sync-alt'
                        variant='transparent'
                        onClickFunc={() => syncManagedBuyer(profile._id)} />
        </div>
        <div className='col-12 p-0'>
          <Table
            pageSize={10}
            sorting={true}
            fontSize={12}
            data={buyerPipeline}
            headers={HEADERS}
          />
        </div>
      </div>
      <StreetViewModal
        show={showStreetViewModal}
        handleClose={() => setShowStreetViewModal(false)}
        apiKey='AIzaSyCvc3X9Obw3lUWtLhAlYwnzjnREqEA-o3o'
      />
    </div>
  );
}

const mapStateToProps = state => ({
    pipeline: state.marketplace
})

export default connect(mapStateToProps, {openStreetView, getBuyerPipeline, trashProperty, likeProperty})(BuyerPipeline)
