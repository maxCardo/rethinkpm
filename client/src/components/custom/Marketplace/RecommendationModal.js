import React, {useState, useEffect} from 'react';
import {Modal, Form, Button} from 'react-bootstrap';
import Select from 'react-select';
import axios from 'axios';

const RecommendationModal = ({show, handleClose, handleSubmit}) => {
  const [buyers, setBuyers] = useState([])
  const [selectedBuyers, setSelectedBuyers] = useState([])
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
    handleSubmit(selectedBuyersIds)
    handleClose()
  }
  
  const handleSelectChange = (newValue) => {
    setSelectedBuyers(newValue);
  }

  return (
    <Modal size='xl' show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Recommend Property</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Select
            isMulti
            name="buyers"
            placeholder="Select Buyers..."
            options={buyers}
            onChange={handleSelectChange}
          />
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