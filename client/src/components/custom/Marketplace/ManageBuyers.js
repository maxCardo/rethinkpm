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



const ManageBuyer = ({createErrorAlert, openStreetView}) => {

    const [loading, setLoading] = useState(false)
    const [listings, setListings] = useState([])
    const [showStreetViewModal, setShowStreetViewModal] = useState(true)
    const [showRecommendationModal, setShowRecommendationModal] = useState(false)
    const [focusedProperty, setFocusedProperty] = useState(undefined)
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
        /*TODO: CHANGE TO API CALL WITH BUYER ID*/
        const res = await axios.get(`/api/profile/buyerPros`, {cancelToken});
        const listings = res.data;
        console.log(listings);
        setListings(listings)
        setLoading(false)
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
    const submitRecommendationModal = (buyers, customMessage) => {
        const data = {
            property: focusedProperty,
            buyers: buyers,
            customMessage: customMessage
        }
        axios.post('/api/marketplace/ops/recommend', data)
    }

    const blacklistListing = (listingId) => {
        if(false) {
            createErrorAlert('You need to save the filter before blacklisting a property')
            return;
        } else {
        }
    }



    useEffect(() => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        fetchData(source.token)
        return () => {
            source.cancel('Component unmounted');
        }
    },[])

    return loading ? <Loading /> : (
        <div>
            <KpiBar />

            <div>
            </div>
            <div className="container-fluid" style={{overflow: 'auto', maxHeight: '80vh'}}>
                <div className="col-12 p-0" >
                    <Table
                        pageSize={10}
                        sorting={true}
                        fontSize={12}
                        data={listings}
                        headers={HEADERS}
                    />
                </div>
            </div>
            <StreetViewModal
                show={showStreetViewModal}
                handleClose={() => setShowStreetViewModal(false)}
                apiKey="AIzaSyCvc3X9Obw3lUWtLhAlYwnzjnREqEA-o3o" />
            <RecommendationModal show={showRecommendationModal} handleClose={() => setShowRecommendationModal(false)} handleSubmit={submitRecommendationModal}/>
        </div>
    )
}


export default connect(undefined, {createErrorAlert, openStreetView})(ManageBuyer)
