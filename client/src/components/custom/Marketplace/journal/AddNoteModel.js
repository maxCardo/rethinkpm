import React, { useState  } from 'react'
import {Modal, Button, Form} from 'react-bootstrap'
import {connect} from 'react-redux'
import {addNote} from '../../../../actions/marketplace/notes'


const AddNoteModule = ({show, handleClose, handleSubmit, addNote, profileType, id}) => {
  const [formData, setFormData] = useState({content:''}) 
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })
  const onSubmit = () => addNote(formData,id,profileType)

  return(
    <Modal size='lg' show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Note</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="updateForm.prospectName">
            <Form.Label>Note:</Form.Label>
            <Form.Control style={{ resize: 'none' }} name='content' as="textarea" rows="5" value={formData.note} onChange={e => onChange(e)} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
          </Button>
        <Button variant="primary" onClick={() => {onSubmit(); handleClose()}}>
          Save Changes
          </Button>
      </Modal.Footer>
    </Modal>
  )
}

const mapStateToProps = state => ({
  id: state.marketplace.focusedProp._id
})


export default connect(mapStateToProps, {addNote})(AddNoteModule) 

