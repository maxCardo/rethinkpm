import React, { useState, useEffect} from 'react';
import {connect} from 'react-redux'
import Table from '../../core/Table';
import Loading from '../../core/LoadingScreen/Loading';
import './style.css';
import StreetViewModal from "./StreetViewModal";
import {openStreetView,syncManagedBuyer,getBuyerPipeline,updateDeal} from "../../../actions/marketplace";
import {FormCheck} from "react-bootstrap";
import IconButton from "../../core/IconButton/IconButton";


const BuyerPipeline = ({openStreetView, profile, getBuyerPipeline, updateDeal,pipeline:{buyerPipeline, loading}}) => {

  const [showStreetViewModal, setShowStreetViewModal] = useState(true)
  const [showDead, setShowDead] = useState(false)
  const [data, setData] = useState()

    useEffect(() => {
      getBuyerPipeline(profile._id);
    }, [profile]);


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
              tooltipContent='Link on website'
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
                onClickFunc={() => updateDeal(item._id, 'liked')} />
            )}  
            <IconButton placement='bottom'
              tooltipContent='Trash property from pipeline'
              id='trash-property-tooltip'
              iconClass='fas fa-trash'
              variant='action-button'
              onClickFunc={() => updateDeal(item._id, 'dead')} />
          </div>
        )
      }
    }
  ]

  return loading ? (
    <Loading />
  ) : (
    <div className='tableWithActions'>
      <div
        className='container-fluid'
        style={{ overflow: 'auto', maxHeight: '80vh' }}
      >
        <div className='ManageBuyers-actions'>
          <IconButton
            placement='right'
            tooltipContent='Get fresh data'
            id='sync-tooltip'
            iconClass='fas fa-sync-alt'
            variant='transparent'
            onClickFunc={() => syncManagedBuyer(profile._id)}
          />
        </div>
        <div>
          <FormCheck label='Show Dead Deals' checked = {showDead} onClick={() => setShowDead(!showDead)} />
        </div>
        <div className='col-12 p-0'>
          <Table
            pageSize={10}
            sorting={true}
            fontSize={12}
            data={showDead === false ? buyerPipeline.filter((deal) => deal.status != 'dead') : buyerPipeline}
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

export default connect(mapStateToProps, {openStreetView, getBuyerPipeline,updateDeal})(BuyerPipeline)
