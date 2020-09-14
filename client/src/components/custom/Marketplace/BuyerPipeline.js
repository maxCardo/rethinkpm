import React, { useState, useEffect, Fragment } from 'react';
import {connect} from 'react-redux'
import axios from 'axios';
import Table from '../../core/Table';
import Loading from '../../core/LoadingScreen/Loading';
import './style.css';
import RecommendationModal from './RecommendationModal';
import {createErrorAlert} from '../../../actions/alert';
import StreetViewModal from "./StreetViewModal";
import {openStreetView, syncManagedBuyer, getBuyerPipeline} from "../../../actions/marketplace";
import AddDataModal from "./AddDataModal";
import {Tooltip, OverlayTrigger, Button} from "react-bootstrap";


const ManageBuyer = ({createErrorAlert, openStreetView, profile, getBuyerPipeline, pipeline}) => {

    const [loading, setLoading] = useState(false)
    const [listings, setListings] = useState(true)

    const [showStreetViewModal, setShowStreetViewModal] = useState(true)
    const [showRecommendationModal, setShowRecommendationModal] = useState(false)
    const [focusedProperty, setFocusedProperty] = useState(undefined)
    const [showAddDataModal, setShowAddDataModal] = useState(false)
    const [buyerListings, setBuyerListings] = useState([])

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
                    <button className='action-buttons__button ' onClick={() => console.log('x ?')}>
                        <i className="fas fa-times"></i>
                    </button>
                    <button className='action-buttons__button ' onClick={() => console.log('star')}>
                        <i className="fas fa-star"></i>
                    </button>
                    {(item.streetName && item.streetNumber) && (
                        <button className='action-buttons__button ' onClick={() =>  openStreetView(item.streetName, item.streetNumber)}>
                            <i className="fas fa-eye" />
                        </button>)}
                </div>
            )
        }
    ]

    useEffect(() => {
      getBuyerPipeline(profile._id)
    },[profile])

   
    return loading ? (
      <Loading />
    ) : (
      <div>
        <div
          className='container-fluid'
          style={{ overflow: 'auto', maxHeight: '80vh' }}
        >
          <div className='ManageBuyers-actions'>
            <OverlayTrigger
              placement={'bottom'}
              overlay={<Tooltip id='sync-tooltip'>Open buyer list</Tooltip>}
            >
                <Button className='action-buttons__button ' onClick={() => console.log('list button log')}>
                <i className='fas fa-list'></i>
              </Button>
            </OverlayTrigger>

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
              data={pipeline.map((record) => record.deal)}
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
    pipeline: state.marketplace.buyerPipeline
})

export default connect(mapStateToProps, {createErrorAlert, openStreetView, syncManagedBuyer, getBuyerPipeline})(ManageBuyer)
