import React, {useState, useEffect, Fragment} from 'react';
import {Modal, Form, Button} from 'react-bootstrap';
import VerticalTable from '../../core/VerticalTable/VerticalTable';
import UnitSchedule from './UnitSchedule'


const rentTiers = {
  1: {
    eff: 550,
    '1bd': 616,
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

const headers= [
  {
    label: 'List Date',
    accessor: 'listDate',
    mapper: 'date'
  },

  {
    label: 'Last Sold',
    accessor: 'lastSold',
    mapper: (sold) => {
      console.log(sold);
      return `Price: ${sold.price} \n Date: ${sold.date}`
    }
  },
  {
    label: 'for',
    accessor: 'lastSold.price',
    className: 'child'
  },
  {
    label: 'opZone',
    accessor: 'opZone'
  },
  {
    label: 'Rent Tier',
    accessor: 'rents.HA.tier'
  }
] 

const roles=[
  {
    unitType: 'single',
    bedrooms: 1,
    bathsFull: 1,
    bathsPartial: 1,
    totalBaths: 2,
    size: 100,
    numUnits: 10
  },
  {
    unitType: 'small',
    bedrooms: 2,
    bathsFull: 1,
    bathsPartial: 1,
    totalBaths: 2,
    size: 200,
    numUnits: 10
  },
  {
    unitType: 'family',
    bedrooms: 4,
    bathsFull: 2,
    bathsPartial: 1,
    totalBaths: 3,
    size: 600,
    numUnits: 10
  }
]

const DetailModal = ({show, handleClose, data, addUnitSchedule}) => {
  if(!data) return ''
  return (
    <Modal size='xl' show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <VerticalTable  headers={headers} data={data}/>
          {data.propertyType === 'multi' &&
            <Fragment>
              <h4>Unit Schedule</h4>
              <UnitSchedule units={data.unitSch} listingId={data._id} addUnitSchedule={addUnitSchedule}/>
            </Fragment>
          }
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DetailModal;