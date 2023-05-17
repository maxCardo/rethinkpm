import React, {useState} from 'react';
import {Modal, Form, Button} from 'react-bootstrap';

const VarifyMod = ({show, handleClose, handleSubmit}) => {
  const [name, setName] = useState('')

  const onSubmit = () => {
    handleSubmit(name)
    handleClose()
  }

  return (
    <Modal size='lg' show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Save Filter</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Name Filter:</Form.Label>
            <Form.Control type="text" value={name} onChange={e => setName(e.target.value)} />
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

export default VarifyMod;