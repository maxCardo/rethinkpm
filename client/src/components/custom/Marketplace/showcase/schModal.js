import React, {useEffect, useState} from 'react';
import {Modal, Form, Button} from 'react-bootstrap';

const SchModal = ({show, handleClose, handleSubmit, editingUnitSch}) => {
  const [rent, setRent] = useState(0)

  useEffect(() => {
    if(editingUnitSch) {
      setRent(editingUnitSch.rent)
    }
  }, [editingUnitSch])

  const onSubmit = () => {
    console.log('running on submit')
    //resetData()
    handleSubmit()
    //handleClose()
  }

  const resetData = () => {
    setRent(0)
  }

  const onClose = () => {
    resetData()
    handleClose()
  }

  return (
    <Modal size='lg' show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Set Rent</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Rent</Form.Label>
              <Form.Control type="number" value={rent} onChange={(e) => setRent(e.target.value)}/>
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

export default SchModal;