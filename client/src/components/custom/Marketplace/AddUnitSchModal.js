import React, {useState, useEffect} from 'react';
import {Modal, Form, Button} from 'react-bootstrap';

const AddUnitSchModal = ({show, handleClose}) => {
  const onSubmit = () => {
    handleClose()
  }
  return (
    <Modal size='xl' show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Unit Schedule</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <Form>
          <Form.Group>
              <Form.Label>Unit Type</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Bedrooms</Form.Label>
              <Form.Control type="number" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Full Bathrooms</Form.Label>
              <Form.Control type="number" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Partial Bathrooms</Form.Label>
              <Form.Control type="number" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Size</Form.Label>
              <Form.Control type="number" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Number of Units</Form.Label>
              <Form.Control type="number" />
            </Form.Group>
          </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          Close
        </Button>
        <Button variant='primary' onClick={onSubmit}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddUnitSchModal;