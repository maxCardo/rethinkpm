import React, { Fragment, useEffect, useState } from 'react';
import {connect} from 'react-redux'
import {Modal, Button, Tab, Nav} from 'react-bootstrap';
import VerticalTable from '../../core/VerticalTable/VerticalTable';
import UnitSchedule from './UnitSchedule'
import CompView from './comps/compView/CompView'
import OwnerInfo from './OwnerInfo'
import Journal from './journal/Journal'

import {getOwnerInfo, setActiveComp, setFocusedProp} from '../../../actions/marketplace'


const rentTiers = {
  1: {
    eff: 550,
    '1BD': 616,
    '2BD': 759,
    '3BD': 968,
    '4BD': 1056,
    '5BD': 1214,
    '6BD': 1372
  },
  2: {
      'eff': 612,
      '1BD': 692,
      '2BD': 851,
      '3BD': 1080,
      '4BD': 1184,
      '5BD': 1361,
      '6BD': 1539
  },
  3: {
      'eff': 619,
      '1BD': 698,
      '2BD': 861,
      '3BD': 1094,
      '4BD': 1203,
      '5BD': 1383,
      '6BD': 1563
  },
  4: {
      'eff': 675,
      '1BD': 756,
      '2BD': 936,
      '3BD': 1188,
      '4BD': 1305,
      '5BD': 1500,
      '6BD': 1696
  },
  5: {
      'eff': 711,
      '1BD': 810,
      '2BD': 999,
      '3BD': 1242,
      '4BD': 1368,
      '5BD': 1573,
      '6BD': 1778
  },
  6: {
      'eff': 880,
      '1BD': 990,
      '2BD': 1221,
      '3BD': 1551,
      '4BD': 1705,
      '5BD': 1960,
      '6BD': 2216
  },
  Pittsburgh: {
      'eff': 466,
      '1BD': 573,
      '2BD': 726,
      '3BD': 915,
      '4BD': 997,
      '5BD': 1150,
      '6BD': 1150
  }
}

const headers = [
  {
    label: 'List Date',
    accessor: 'listDate',
    mapper: 'date',
  },
  {
    label: 'County',
    accessor: 'county',
  },
  {
    label: 'Last Sold',
    accessor: 'lastSold',
    mapper: (sold) => (sold ? `Price: ${sold.price}  Date: ${sold.date}` : ''),
  },
  {
    label: 'SqFt',
    accessor: 'buildingSize',
  },
  {
    label: 'Zoneing',
    accessor: 'zoning',
  },
  {
    label: 'Num Units',
    accessor: 'numUnits',
  },
  {
    label: 'opZone',
    accessor: 'opZone',
  },
  {
    label: 'Rent Tier',
    accessor: 'rents.HA.tier',
  },
  {
    label: 'Sub Rents',
    accessor: 'rents.HA.tier',
    mapper: (tier) => tier ? `eff: ${rentTiers[tier].eff} | 1BD: ${rentTiers[tier]['1BD']} | 2BD: ${rentTiers[tier]['2BD']} | 3BD: ${rentTiers[tier]['3BD']} | 4BD: ${rentTiers[tier]['4BD']}`
        : '',
  },
  {
    label: 'Area Rents',
    accessor: 'rents.HA.area',
    mapper: (rent) => rent ? `$${rent}`: 'N/A',
  },
  {
    label: 'Taxes',
    accessor: 'model.taxes',
    mapper: (taxes) => taxes ? `Current: $${taxes.low.toFixed(0)} | Reassessed on PP (projected): $${taxes.high ? taxes.high.toFixed(0): '?'}` : 'Tax Info Not Available'
  },
  {
    label: 'Owner Ocupied?',
    accessor: 'ownerOcc',
  },
  {
    label: 'Value Score',
    accessor: 'cap',
  },
  {
    label: 'Value Score (Adjusted)?',
    accessor: 'highCap',
  },
  {
    label: 'CompRange',
    accessor: 'compReport.price.priceRange',
  },
  {
    label: 'Sample Size',
    accessor: 'compReport.price.sampleSize',
  },
  {
    label: 'Standard Deviation',
    accessor: 'compReport.price.stdDev',
    mapper: (stdDev) => stdDev ? `$${parseInt(stdDev)}` : 'N/A',
  },
  {
    label: 'Current Value',
    accessor: 'compReport.price._25_75',
  },
  {
    label: 'Current Value',
    accessor: 'compReport.price.oov',
    mapper: (arv) => arv ? `$${arv.toFixed(0)}` : 'N/A',
  },
  {
    label: 'Average Value',
    accessor: 'compReport.price.average',
    mapper: (arv) => arv ? `$${arv.toFixed(0)}` : 'N/A',
  },
  {
    label: 'ARV',
    accessor: 'compReport.price.arv',
    mapper: (arv) => arv ? `$${arv.toFixed(0)}` : 'N/A',
  },

]; 


const DetailModal = ({ show, handleClose, data, addUnitSchedule, modifyUnitSchedule, deleteUnitSchedule, setRent, ownerInfo, type = 'salesLead', getOwnerInfo, setActiveComp, setFocusedProp}) => {
  const [prop, setProp] = useState('')
  const [subRent, setSubRent] = useState('')
  const [price, setPrice] = useState('')

  useEffect(() => {
    const prop = data
    if (prop) {
      const subRent = data.data.rents.HA.success ? rentTiers[data.rents.HA.tier] : null
      const price = data.currentPrice ? data.currentPrice : data.listPrice
      setSubRent(subRent)
      setPrice(price)
      getOwnerInfo(prop._id, type)
      setFocusedProp(prop) 
    }
    setProp(prop)
  }, [data])
  
  if (!prop) return ''

  return (
    <Modal className='Marketplace__DetailModal' size='xl' show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Details: {prop.listNumber}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tab.Container className='detailModal-tabs__container Marketplace__details' defaultActiveKey="details">
          <Nav className='nav-tabs detailModal__tabs'>
            <Nav.Item>
              <Nav.Link eventKey="details">Property Details</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="news">Owner Info</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="compView">Comps</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="journal">Journal</Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="details">
              <VerticalTable headers={headers} data={data} />
              {prop.propertyType === 'multi' &&
                <Fragment>
                  <h4>Unit Schedule</h4>
                  <UnitSchedule units={prop.unitSch} listPrice={price} addUnitSchedule={addUnitSchedule} modifyUnitSchedule={modifyUnitSchedule} deleteUnitSchedule={deleteUnitSchedule} setRent={setRent} zip={prop.zipcode} subRents={subRent} />
                </Fragment>
              }
            </Tab.Pane>
            <Tab.Pane eventKey="news">
              <OwnerInfo ownerInfo={ownerInfo}/>
            </Tab.Pane>
            <Tab.Pane eventKey="compView">
              <CompView type={type}/>
            </Tab.Pane>
            <Tab.Pane eventKey="journal">
              <Journal type={type} id={data._id} />
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}


const mapStateToProps = state => ({
  ownerInfo: state.marketplace.ownerInfo
})

export default connect(mapStateToProps, { getOwnerInfo, setFocusedProp})(DetailModal);