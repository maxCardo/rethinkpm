import React, {useState, useEffect} from 'react';
import {Modal, Form, Button} from 'react-bootstrap';
import VerticalTable from '../../core/VerticalTable/VerticalTable';
import RentRoles from './RentRoles'

const headers= [
  {
    label: 'Tract',
    accessor: 'tract'
  },
  {
    label: 'Bedrooms',
    accessor: 'bedrooms'
  },
  {
    label: 'Ran County',
    accessor: 'data.county.ran'
  },
  {
    label: 'Rent Price',
    computed: true,
    calculate: (data) => ((data.bedrooms*400 + data.bathsFull * 200) / data.condition)  
  },
  {
    label: 'List Date',
    accessor: 'listDate',
    mapper: 'date'
  },
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

const AddDataModal = ({show, handleClose, data}) => {
  return (
    <Modal size='xl' show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <VerticalTable  headers={headers} data={data}/>
          <h4>Rent roles</h4>
          <RentRoles roles={roles}/>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddDataModal;