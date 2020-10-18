import React, {useEffect, useState} from 'react';
import {Modal, Form, Button} from 'react-bootstrap';

const AddUnitSchModal = ({show, handleClose, handleSubmit, editingUnitSch}) => {
  const [unitType, setUnitType] = useState('')
  const [bedrooms, setBedrooms] = useState(0)
  const [fullBathrooms, setFullBathrooms] = useState(0)
  const [partialBathrooms, setPartialBathrooms] = useState(0)
  const [size, setSize] = useState(0)
  const [units, setUnits] = useState(0)

  useEffect(() => {
    if(editingUnitSch) {
      setUnitType(editingUnitSch.unitType)
      setBedrooms(editingUnitSch.bedrooms)
      setFullBathrooms(editingUnitSch.bathsFull)
      setPartialBathrooms(editingUnitSch.bathsPartial)
      setSize(editingUnitSch.size)
      setUnits(editingUnitSch.numUnits)

    }
  }, [editingUnitSch])

  const onSubmit = () => {
    const info = {
      unitType,
      bedrooms,  
      bathsFull: fullBathrooms, 
      bathsPartial: partialBathrooms, 
      totalBaths: +fullBathrooms + +partialBathrooms,
      size, //sqft
      numUnits: units
    }

    resetData()
    if(editingUnitSch) {
      handleSubmit(info, editingUnitSch.unitType)
    } else {
      handleSubmit(info)
    }
    handleClose()
  }

  const resetData = () => {
    setUnitType('')
    setBedrooms(0)
    setFullBathrooms(0)
    setPartialBathrooms(0)
    setSize(0)
    setUnits(0)
  }

  const onClose = () => {
    resetData()
    handleClose()
  }

  return (
    <Modal size='lg' show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Unit Schedule</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <Form>
          <Form.Group>
              <Form.Label>Unit Type</Form.Label>
              <Form.Control type="text" value={unitType} onChange={(e) => setUnitType(e.target.value)}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Bedrooms</Form.Label>
              <Form.Control type="number" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Full Bathrooms</Form.Label>
              <Form.Control type="number" value={fullBathrooms} onChange={(e) => setFullBathrooms(e.target.value)}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Partial Bathrooms</Form.Label>
              <Form.Control type="number" value={partialBathrooms} onChange={(e) => setPartialBathrooms(e.target.value)}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Size</Form.Label>
              <Form.Control type="number" value={size} onChange={(e) => setSize(e.target.value)}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Number of Units</Form.Label>
              <Form.Control type="number" value={units} onChange={(e) => setUnits(e.target.value)}/>
            </Form.Group>
          </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={onClose}>
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