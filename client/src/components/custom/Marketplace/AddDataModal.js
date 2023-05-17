import React, {useState} from 'react';
import {Modal, Form, Button} from 'react-bootstrap';
import Select from 'react-select';

const AddDataModal = ({show, handleClose, handleSubmit, property}) => {
  const conditions = [
    {
      label: 'A',
      value: '8',
    },
    {
      label: 'A-',
      value: '7',
    },
    {
      label: 'B',
      value: '6',
    },
    {
      label: 'B-',
      value: '5',
    },
    {
      label: 'C',
      value: '4',
    },
    {
      label: 'C-',
      value: '3',
    },
    {
      label: 'D',
      value: '2',
    },
    {
      label: 'D-',
      value: '1',
    },
  ];
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
    <Modal size='lg' show={show} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add Condition</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Condition:</Form.Label>
            <Select
              name='condition'
              placeholder='Select Condition...'
              defaultValue={condition}
              options={conditions}
              onChange={handleSelectChange}
            />
          </Form.Group>
          {property && property.propertyType === 'multi' && (
            <Form.Group>
              <Form.Label>Nº of Units:</Form.Label>
              <Form.Control
                type='number'
                value={numUnits}
                onChange={(e) => setNumUnits(e.target.value)}
              />
            </Form.Group>
          )}
          <p style={{fontSize:'x-small'}}>
            Discription Of Conditions Codes: 
            <br />A = Newer Finishes (0-5 YO), Cap-Ex in first 1/3rd of life. Turn Key property ready for move in.
            <br />B = Finishes at roughly half age in "like new" condition (6-10YO), cap ex at half age. Property is in move in condition with litecosmetic repairs. 
            <br/> C = Finishes and cap-ex are aged but are still fully functional. Property may require infastructur repair replacement in near future but is still move in ready. 
            <br/> D = Finishes and infastructure past life and are not in working order, propety requires repairs and infastructure in order to move in.
          </p>
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
  );
}

export default AddDataModal;