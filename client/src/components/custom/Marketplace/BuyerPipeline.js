import React, {useState, useEffect, useRef } from 'react';
import {connect} from 'react-redux'
import Table from '../../core/Table';
import Loading from '../../core/LoadingScreen/Loading';
import './style.css';
import StreetViewModal from "./StreetViewModal";
import {openStreetView,syncManagedBuyer,getBuyerPipeline,updateDeal} from "../../../actions/marketplace";
import {Form } from "react-bootstrap";
import IconButton from "../../core/IconButton/IconButton";
import PropertyDetailsModal from "./PropertyDetailsModal";
import {checkBoxCheck, useWindowSize} from "../../../util/commonFunctions";
import { afterMain } from '@popperjs/core';

const BuyerPipeline = ({openStreetView, profile, getBuyerPipeline, updateDeal,pipeline:{buyerPipeline, loading}}) => {

  const [showStreetViewModal, setShowStreetViewModal] = useState(true)
  const [showDead, setShowDead] = useState(false)
  const [showPropertyDetailsModal, setShowPropertyDetailsModal] = useState(false)
  const [iframeTarget, setIframeTarget] = useState('')
  const [tablePageSize, setTablePageSize] = useState(10)
  const tableContainerHeight = useRef(null);
  const size = useWindowSize();

    useEffect(() => {
      getBuyerPipeline(profile._id);
    }, [profile, getBuyerPipeline]);


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

  const testingCellClick = (x) => {
    console.log('testing...: ', x);
  }

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
      accessor: 'deal.propertyType',
      label: 'Type',
    },
    {
      accessor: 'deal.listDate',
      label: 'List Date',
      mapper: 'date',
    },
    {
      accessor: 'deal.city',
      label: 'Area',
    },
    {
      accessor: 'deal.listPrice',
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
            {item.deal.streetNumber} {item.deal.streetName}
          </p>
        </div>
      ),
    },
    {
      label: 'Zip',
      accessor: 'deal.zipcode',
    },
    {
      accessor: 'deal.bedrooms',
      label: 'Bedrooms',
    },
    {
      accessor: 'deal.totalBaths',
      label: 'Bathrooms',
    },
    {
      accessor: 'deal.condition',
      label: 'Condition',
      mapper: (data) => conditionsMap[data],
    },
    {
      reactComponent: true,
      label: 'Actions',
      render: (item) => {
        return (
          <div>
            <IconButton
              placement='bottom'
              tooltipContent='View property details'
              id='property-details-tooltip'
              iconClass='fas fa-list'
              variant='action-button'
              onClickFunc={() => {
                setIframeTarget(
                  `https://cardo.idxbroker.com/idx/details/listing/d504/${item.deal.listNumber}`
                );
                setShowPropertyDetailsModal(true);
              }}
            />
            <IconButton
              placement='bottom'
              tooltipContent='Link on website'
              id='link-tooltip'
              iconClass='fas fa-link'
              variant='link'
              href={`https://cardo.idxbroker.com/idx/details/listing/d504/${item.deal.listNumber}`}
            />
            {item.deal.streetName && item.deal.streetNumber && (
              <IconButton
                placement='bottom'
                tooltipContent='Open street view'
                id='street-view-tooltip'
                iconClass='fas fa-eye'
                variant='action-button'
                onClickFunc={() =>
                  openStreetView(item.deal.streetName, item.deal.streetNumber)
                }
              />
            )}
            {item.status && (
              <IconButton
                placement='bottom'
                tooltipContent='Like for buyer'
                id='like-tooltip'
                iconClass='fas fa-heart'
                variant='action-button'
                onClickFunc={() => updateDeal(item._id, 'liked')}
              />
            )}
            <IconButton
              placement='bottom'
              tooltipContent='Trash property from pipeline'
              id='trash-property-tooltip'
              iconClass='fas fa-trash'
              variant='action-button'
              onClickFunc={() => updateDeal(item._id, 'dead')}
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
      <div
        className='container-fluid'
      >
        <div className='ManageBuyers-actions'>
          <Form.Group className='ManageBuyers__check-group'>
            <Form.Label className="checkbox path">
              <input type="checkbox" checked={showDead} name='okToText' onClick={() => setShowDead(!showDead)} onChange={() => {}}/>
              {checkBox} &nbsp; Show Dead Deals
            </Form.Label>
          </Form.Group>
          <IconButton
            placement='right'
            tooltipContent='Get fresh data'
            id='sync-tooltip'
            iconClass='fas fa-sync-alt'
            variant='transparent'
            onClickFunc={() => syncManagedBuyer(profile._id)}
          />
        </div>
        <div className='col-12 p-0'>
          <Table
            key={tablePageSize}
            pageSize={tablePageSize}
            sorting={true}
            fontSize={12}
            data={showDead === false ? buyerPipeline.filter((deal) => deal.status !== 'dead') : buyerPipeline}
            headers={HEADERS}
            onClickRow={(item) => testingCellClick(item)}
          />
        </div>
      </div>
      <StreetViewModal
        show={showStreetViewModal}
        handleClose={() => setShowStreetViewModal(false)}
        apiKey='AIzaSyCvc3X9Obw3lUWtLhAlYwnzjnREqEA-o3o'
      />
      <PropertyDetailsModal iframeTarget={iframeTarget} show={showPropertyDetailsModal} handleClose={() => setShowPropertyDetailsModal(false)} />
    </div>
  );
}

const mapStateToProps = state => ({
    pipeline: state.marketplace
})

export default connect(mapStateToProps, {openStreetView, getBuyerPipeline,updateDeal})(BuyerPipeline)
