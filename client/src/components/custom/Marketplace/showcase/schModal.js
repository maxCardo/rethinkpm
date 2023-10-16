import React, {useEffect, useState} from 'react';
import Loading from '../../../core/LoadingScreen/Loading';
import {Modal, Form, Button} from 'react-bootstrap';
import Dayjs from 'dayjs'

const SchModal = ({show, handleClose, handleSubmit, focusedProperty = null}) => {
  const initialFormState = {tech: null, date: null, time: null, notes: null, property: null}
  const [formData, setFormData] = useState(initialFormState)
  const [showValid, setShowValid] = useState(false)
  const [deal, setDeal] = useState({streetNumber: '', streetName:''})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setDeal(focusedProperty)
    if (focusedProperty) {
      setFormData({...formData, property: focusedProperty})
      setLoading(false)  
    }   
  },[focusedProperty])

  // useEffect(() => {
  //  console.log('formData: ', formData)
  //  console.log('property: ', focusedProperty)
  // }, [formData])

  const _setFormData = (data) => {
    console.log('something is changing ',  data)
    setFormData(data)
    console.log('formData: ', formData)
  }
  
  const onSubmit = () => {
    console.log('running on submit')
    const noNull = Object.values(formData).every(v => v) 
    if (noNull) {
      handleSubmit(formData)
      setFormData(initialFormState)
      handleClose()  
    }else {
      setShowValid(true)
      setTimeout(() => {setShowValid(false)}, 5000);
    }
  }

  const onClose = () => {
    setFormData(initialFormState)
    handleClose()
  }

  return loading ? (
    <Loading />
   ) :(
    <Modal size='lg' show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Set Appointment: {`${deal.streetNumber} ${deal.streetName}`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Tech</Form.Label>
              
              
              <Form.Control as="select" placeholder='Please select' onChange={(e) => setFormData({...formData, tech:e.target.value})}>
                <option value="" hidden>Please select</option>
                <option value="20">Sean Cousins</option>
                <option value="16">Cody Roberts</option>
                <option value="7">David Knoll</option>
                <option value="10">Adam Poznanski</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" format='MM/DD/YYYY' onChange={(e) => setFormData({...formData, date:Dayjs(e.target.value).format('MM/DD/YYYY')})}/>
5            </Form.Group>
            <Form.Group>
              <Form.Label>Time</Form.Label>
              <Form.Control type="time" onChange={(e) => setFormData({...formData, time:e.target.value})}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Notes</Form.Label>
              <Form.Control as="textarea" rows={3} onChange={(e) => setFormData({...formData, notes:e.target.value})}/>
            </Form.Group>
          </Form>
      </Modal.Body>
      {showValid === true && <div style={{color: 'red'}}>Please complete all field in the form</div> }
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