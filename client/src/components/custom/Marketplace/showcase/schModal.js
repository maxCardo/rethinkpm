import React, {useEffect, useState} from 'react';
import {Modal, Form, Button} from 'react-bootstrap';

const SchModal = ({show, handleClose, handleSubmit, editingUnitSch}) => {
  const [formData, setFormData] = useState({tech: null, date: null, time: null, notes: null })

  useEffect(() => {
    if(editingUnitSch) {
      setRent(editingUnitSch.rent)
    }
  }, [editingUnitSch])

  const _setFormData = (data) => {
    console.log('something is changing ',  data)
  }

  

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
        <Modal.Title>Set Appointment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Tech</Form.Label>
              <Form.Control as="select" onChange={(e) => setRent(e.target.value)}>
                <option value="20">Sean Cousins</option>
                <option value="16">Cody Roberts</option>
                <option value="7">David Knoll</option>
                <option value="10">Adam Poznanski</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" value={rent} onChange={(e) => setRent(e.target.value)}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Time</Form.Label>
              <Form.Control type="time" value={rent} onChange={(e) => setRent(e.target.value)}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Notes</Form.Label>
              <Form.Control as="textarea" rows={3} onChange={(e) => setRent(e.target.value)}/>
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