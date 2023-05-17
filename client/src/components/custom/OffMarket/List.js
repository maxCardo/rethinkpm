import React, { useState, useEffect, useRef } from 'react';
//remove after refactor
import axios from 'axios'
import { connect } from 'react-redux'
import Table from '../../core/Table';
import Loading from '../../core/LoadingScreen/Loading';
import '../Marketplace/style.css';
import StreetViewModal from "../Marketplace/StreetViewModal";
import { getOffMarketDeals, openStreetView, deletePropRec} from "../../../actions/offMarket";
import { Form } from "react-bootstrap";
import IconButton from "../../core/IconButton/IconButton";
// import PropertyDetailsModal from "./PropertyDetailsModal";
import { checkBoxCheck, useWindowSize } from "../../../util/commonFunctions";
import { afterMain } from '@popperjs/core';
import DetailModal from '../Marketplace/DetailModal'

const OffMarketList = ({ openStreetView, getOffMarketDeals, pipeline: { sellerPipeline, loading }, deletePropRec }) => {

    const [showStreetViewModal, setShowStreetViewModal] = useState(true)
    const [showDead, setShowDead] = useState(false)
    //const [showPropertyDetailsModal, setShowPropertyDetailsModal] = useState(false)
    //const [iframeTarget, setIframeTarget] = useState('')
    const [tablePageSize, setTablePageSize] = useState(10)
    const [focusedProperty, setFocusedProperty] = useState()
    const [showDetailModal, setShowDetailModal] = useState(false);
    const tableContainerHeight = useRef(null);
    const size = useWindowSize();

    useEffect(() => {
        getOffMarketDeals();
    }, []);

    //EFFECT:  Redraw table on window resize
    useEffect(() => {
        const height = size.height;
        // 360 is sum of all heights of everything else that takes vertical space outside the container
        const controlHeight = height - 280;
        let rowNumber;

        if (height) {
            // 43 is height of row
            rowNumber = Math.floor(controlHeight / 43);
        } else {
            rowNumber = 10;
        }

        if ((tableContainerHeight.current > controlHeight) && (tableContainerHeight.current - 50 > controlHeight)) {
            setTablePageSize(rowNumber)
            tableContainerHeight.current = controlHeight;
        } else if ((tableContainerHeight.current < controlHeight) && (tableContainerHeight.current + 50 < controlHeight)) {
            setTablePageSize(rowNumber)
            tableContainerHeight.current = controlHeight;
        } else {
            console.log('effect did nothing')
        }

    }, [size.height]); // Empty array ensures that effect is only run on mount

    const checkBox = checkBoxCheck();

    const startShowDetailFlow = (item) => {
        setFocusedProperty(item);
        setShowDetailModal(true);
    };

    const conditionsMap = {
        1: 'D-',
        2: 'D',
        3: 'C-',
        4: 'C',
        5: 'B-',
        6: 'B',
        7: 'A-',
        8: 'A',
        0: 'N/A',
    };


    const HEADERS = [
        {
            accessor: 'status',
            label: 'Status',
        },
        {
            accessor: 'propertyType',
            label: 'Type',
        },
        {
            accessor: 'createDate',
            label: 'List Date',
            mapper: 'date',
        },
        {
            accessor: 'city',
            label: 'Area',
        },
        {
            accessor: 'listPrice',
            label: 'List Price',
            mapper: 'money',
        },
        {
            reactComponent: true,
            label: 'Address',
            className: 'Marketplace__address',
            render: (item) => (
                <div>
                    <p>
                        {item.streetNumber} {item.streetName}
                    </p>
                </div>
            ),
        },
        {
            label: 'Zip',
            accessor: 'zipcode',
        },
        {
            accessor: 'bedrooms',
            label: 'Bedrooms',
        },
        {
            accessor: 'totalBaths',
            label: 'Bathrooms',
        },
        {
            accessor: 'condition',
            label: 'Condition',
            mapper: (data) => conditionsMap[data],
        },
        {
            reactComponent: true,
            label: 'Actions',
            render: (item) => {
                return (
                    <div>
                        {item.streetName && item.streetNumber && (
                            <IconButton
                                placement='bottom'
                                tooltipContent='Open street view'
                                id='street-view-tooltip'
                                iconClass='fas fa-eye'
                                variant='action-button'
                                onClickFunc={() =>
                                    openStreetView(item.streetName, item.streetNumber, item.zipcode)
                                }
                            />
                        )}
                        {/* {item.status && (
                            <IconButton
                                placement='bottom'
                                tooltipContent='Like property'
                                id='like-tooltip'
                                iconClass='fas fa-heart'
                                variant='action-button'
                                onClickFunc={() => updateDeal(item._id, 'liked')}
                            />
                        )} */}
                        <IconButton
                            placement='bottom'
                            tooltipContent='Trash property from pipeline'
                            id='trash-property-tooltip'
                            iconClass='fas fa-trash'
                            variant='action-button'
                            onClickFunc={() => deletePropRec(item._id)}
                        />
                    </div>
                );
            },
        },
    ];


    return loading ? (
        <Loading />
    ) : (
            <div className='tableWithActions buyerPipeline'>
                <div className='container-fluid'>
                    <div className='ManageBuyers-actions'>
                        <Form.Group className='ManageBuyers__check-group'>
                            <Form.Label className="checkbox path">
                                <input type="checkbox" checked={showDead} name='okToText' onClick={() => setShowDead(!showDead)} onChange={() => { }} />
                                {checkBox} &nbsp; Show Dead Deals
                            </Form.Label>
                        </Form.Group>
                    </div>
                    <div className='col-12 p-0'>
                        <Table
                            key={tablePageSize}
                            pageSize={tablePageSize}
                            sorting={true}
                            fontSize={12}
                            data={showDead === false ? sellerPipeline.filter((deal) => deal.status !== 'dead') : sellerPipeline}
                            headers={HEADERS}
                            onClickRow={(item) => startShowDetailFlow(item)}
                        />
                    </div>
                </div>
                <StreetViewModal
                    show={showStreetViewModal}
                    handleClose={() => setShowStreetViewModal(false)}
                    apiKey='AIzaSyCvc3X9Obw3lUWtLhAlYwnzjnREqEA-o3o'
                />
                {/* <PropertyDetailsModal iframeTarget={iframeTarget} show={showPropertyDetailsModal} handleClose={() => setShowPropertyDetailsModal(false)} /> */}
                <DetailModal show={showDetailModal} data={focusedProperty} type={'listLead'} handleClose={() => setShowDetailModal(false)} /> 
                 {/* addUnitSchedule={addUnitSchedule} modifyUnitSchedule={modifyUnitSchedule} deleteUnitSchedule={deleteUnitSchedule} /> */}
            </div>
        );
}

const mapStateToProps = state => ({
    pipeline: state.offMarket
})

export default connect(mapStateToProps, { openStreetView, deletePropRec, getOffMarketDeals })(OffMarketList)

