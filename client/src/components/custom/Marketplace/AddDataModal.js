import React, {useState} from 'react';
import {Modal, Form, Button} from 'react-bootstrap';
import Select from 'react-select';

const AddDataModal = ({show, handleClose, handleSubmit, property}) => {
  const conditions = [
    {
      label: 'A',
      value: '4'
    },
    {
      label: 'B',
      value: '3'
    },
    {
      label: 'C',
      value: '2'
    },
    {
      label: 'D',
      value: '1'
    },
  ]
  const [condition, setCondition] = useState(undefined)
  const [numUnits, setNumUnits] = useState(undefined)
  if(show && property && property.numUnits && !numUnits) {
    setNumUnits(property.numUnits)
    
  }
  if(show && property && property.condition && !condition) {
    const conditionSelected = conditions.find((condition) => condition.value === property.condition)
    setCondition(conditionSelected)
  }


  const handleSelectChange = (condition) => {
    setCondition(condition)
  }
  const onSubmit = () => {
    handleSubmit(condition, numUnits)
    closeModal()
  }
  const closeModal = () => {
    handleClose()
    setCondition(undefined)
    setNumUnits(undefined)
  }
  return (
    <Modal size='xl' show={show} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add Condition</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>
              Condition:
            </Form.Label>
            <Select
              name="condition"
              placeholder="Select Condition..."
              defaultValue={condition}
              options={conditions}
              onChange={handleSelectChange}
            />
          </Form.Group>
          {property && property.propertyType == 'multi' &&
            <Form.Group>
              <Form.Label>
                Nº of Units:
              </Form.Label>
              <Form.Control type='number' value={numUnits} onChange={(e) => setNumUnits(e.target.value)}/>
            </Form.Group>
          }
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={closeModal}>
          Close
        </Button>
        <Button variant='primary' onClick={onSubmit}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddDataModal;