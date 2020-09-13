import React, {useState, useEffect} from 'react';
import {Modal, Form, Button} from 'react-bootstrap';
import Select from 'react-select';
import axios from 'axios';

const RecommendationModal = ({show, handleClose, handleSubmit, context, profile}) => {
  const [buyers, setBuyers] = useState([])
  const [selectedBuyers, setSelectedBuyers] = useState([])
  const [customMessage, setCustomMessage] = useState('')
  const loadBuyers = async (cancelToken) => {
    const data = {
      filters: {}
    }
    const res = await axios.post('/api/profile/buyerPros/filter', data, {cancelToken})
    const buyerOptions = res.data.record.map((buyer) => ({label: buyer.fullName, value: buyer._id}))
    setBuyers(buyerOptions)
  }
  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    loadBuyers(source.token)
    return () => {
      source.cancel('Component unmounted');
    }
  }, [])

  const onSubmit = () => {
    const selectedBuyersIds = selectedBuyers.map(buyer => buyer.value)
    handleSubmit(selectedBuyersIds, customMessage)
    handleClose()
  }
  
  const handleSelectChange = (newValue) => {
    setSelectedBuyers(newValue);
  }

  const handleTextAreaChange = (event) => {
    setCustomMessage(event.target.value)
  }

  return (
    <Modal size='xl' show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Recommend Property</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Select
            isMulti={!(context === 'buyer')}
            defaultValue={(context === 'buyer' && profile) && { label:profile.fullName, value: 0 }}
            name="buyers"
            placeholder="Select Buyers..."
            options={(context === 'buyer') ? [] : buyers}
            onChange={handleSelectChange}
            isDisabled={(context === 'buyer')}
          />
          <div style={{marginTop: 10}}>
            <Form.Control as="textarea" rows="3" placeholder="Write a custom message..." onChange={handleTextAreaChange}/>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          Close
        </Button>
        <Button variant='primary' onClick={onSubmit}>
          Recommend
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default RecommendationModal;