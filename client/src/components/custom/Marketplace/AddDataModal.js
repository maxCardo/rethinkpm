import React, {useState} from 'react';
import {Modal, Form, Button} from 'react-bootstrap';
import Select from 'react-select';

const AddDataModal = ({show, handleClose, handleSubmit}) => {
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
  const handleSelectChange = ({value}) => {
    setCondition(value)
  }
  const onSubmit = () => {
    handleSubmit(condition)
    handleClose()
  }
  return (
    <Modal size='xl' show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Condition</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Select
            name="condition"
            placeholder="Select Condition..."
            options={conditions}
            onChange={handleSelectChange}
          />
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

export default AddDataModal;