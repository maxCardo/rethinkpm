import React, { useState, useEffect} from 'react';
import {connect} from 'react-redux'
import Table from '../../core/Table';
import Loading from '../../core/LoadingScreen/Loading';
import './style.css';
import StreetViewModal from "./StreetViewModal";
import {
    openStreetView,
    syncManagedBuyer,
    getBuyerPipeline,
    trashProperty,
    likeProperty
} from "../../../actions/marketplace";
import {Tooltip, OverlayTrigger, Button} from "react-bootstrap";
import IconButton from "../../core/IconButton";


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
            accessor: "deal.streetName",
            label: "Address"
        },
        {
            accessor: 'deal.listPrice',
            label: 'List Price',
            mapper: 'money'
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
                console.log(item);
                return (
                    <div>
                        <a className='action-buttons__button ' href={`http://cardo.idxbroker.com/idx/details/listing/d504/${item.deal.listNumber}`} target= "_blank" rel="noopener noreferrer">
                            <i className="fas fa-link"></i>
                        </a>
                        {item.status && (
                            <button className='action-buttons__button ' onClick={() => likeProperty(profile._id, item.deal._id)}>
                                <i className="fas fa-heart"></i>
                            </button>
                        )}

                        <button className='action-buttons__button ' onClick={() => console.log('star')}>
                            <i className="fas fa-star"></i>
                        </button>
                        {(item.deal.streetName && item.deal.streetNumber) && (
                            <button className='action-buttons__button ' onClick={() =>  openStreetView(item.deal.streetName, item.deal.streetNumber)}>
                                <i className="fas fa-eye" />
                            </button>)}
                        <button className='action-buttons__button ' onClick={() => trashProperty(profile._id, item.deal._id)}>
                            <i className="fas fa-trash"></i>
                        </button>
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
              <IconButton placement='bottom' tooltipContent='Open <strong>buyer</strong> list' id='sync-tooltip' iconClass='fas fa-list' onClickFunc={() => console.log('show buyer list for agent')} />

            <OverlayTrigger
              placement={'right'}
              overlay={
                <Tooltip id='sync-tooltip'>
                  Get <strong>fresh</strong> data.
                </Tooltip>
              }
            >
              <Button className='action-buttons__button ' onClick={syncManagedBuyer(profile._id)}>
                <i className='fas fa-sync-alt'></i>
              </Button>
            </OverlayTrigger>
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
