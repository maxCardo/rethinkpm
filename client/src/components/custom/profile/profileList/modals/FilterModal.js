import React, {Fragment, useState} from 'react'
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import Select from 'react-select'
import zipcodes from './supportData/zipcodes'
import areas from './supportData/areas'


const FilterModal = ({show, handleClose}) => {

    var initialState = {
      officeFilterType: { label: "Don't filter", value: 'noFilter' },
      officeFilterValue: '',
      statusFilterType: { label: "Don't filter", value: 'noFilter' },
      statusFilterValue: [],
      leadOwnerFilterType: { label: "Don't filter", value: 'noFilter' },
      leadOwnerFilterValue: '',
      salesFilterType: { label: "Don't filter", value: 'noFilter' },
      salesFilterValue: '',
      salesFilterFirstValue: '',
      salesFilterSecondValue: '',
      zipcodesFilterType: { label: "Don't filter", value: 'noFilter' },
      zipcodesFilterValue: [],
      areasFilterType: { label: "Don't filter", value: 'noFilter' },
      areasFilterValue: [],
    };


    const [state, setState] = useState(initialState);

    let {
      officeFilterType,
      officeFilterValue,
      statusFilterType,
      statusFilterValue,
      leadOwnerFilterType,
      leadOwnerFilterValue,
      salesFilterType,
      salesFilterValue,
      salesFilterFirstValue,
      salesFilterSecondValue,
      zipcodesFilterType,
      zipcodesFilterValue,
      areasFilterType,
      areasFilterValue,
    } = state

     const arrayFilters = [
       { label: "Don't filter", value: 'noFilter' },
       { label: 'in', value: 'in' },
       { label: 'out', value: 'out' },
     ];

     const stringFilters = [
       { label: "Don't filter", value: 'noFilter' },
       { label: '==', value: '==' },
       { label: 'includes', value: 'includes' },
     ];
     const numberFilters = [
       { label: "Don't filter", value: 'noFilter' },
       { label: 'range', value: 'range' },
       { label: '==', value: '==' },
       { label: '!=', value: '!=' },
       { label: '>', value: '>' },
       { label: '>=', value: '>=' },
       { label: '<', value: '<' },
       { label: '<=', value: '<=' },
     ];

     const statusType = [
       { value: 'new', label: 'Lead' },
       { value: 'prospect', label: 'Prospect' },
       { value: 'pending', label: 'Pending' },
       { value: 'agent', label: 'Agent' },
       { value: 'notInterested', label: 'Not Interested' },
     ];

     const handleSelectChange = (params) => {
         console.log(params)
     }

     const handleChange = (params) => {
         console.log('handle Change: ', params)
     }

     const submitFilter = () => {
         console.log('submitFilter:', state);
     }
     
     
     
     //call api for names of offices
     const officeOptions = [
       { value: 'agent', label: 'Agent' },
       { value: 'notInterested', label: 'Not Interested' },
     ];




    return (
      <Modal size='xl' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create filter</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col xs={6}>
                <Form.Group>
                  <Form.Label>Office:</Form.Label>
                  <Row>
                    <Col xs={5}>
                      <Select
                        options={arrayFilters}
                        value={officeFilterType}
                        onChange={handleSelectChange('officeFilterType')}
                      />
                    </Col>
                    <Col xs={7}>
                      <Select
                        isMulti
                        options={officeOptions}
                        value={officeFilterValue}
                        onChange={e => handleSelectChange('officeFilterValue')}
                      />
                    </Col>
                  </Row>
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group>
                  <Form.Label>Status:</Form.Label>
                  <Row>
                    <Col xs={5}>
                      <Select
                        options={arrayFilters}
                        value={statusFilterType}
                        onChange={e => handleChange('statusFilterType')}
                      />
                    </Col>
                    <Col xs={7}>
                      <Select
                        isMulti
                        options={statusType}
                        value={statusFilterValue}
                        onChange={e => handleSelectChange('statusFilterValue')}
                      />
                    </Col>
                  </Row>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={6}>
                <Form.Group>
                  <Form.Label>Lead Owner:</Form.Label>
                  <Row>
                    <Col xs={5}>
                      <Select
                        options={stringFilters}
                        value={leadOwnerFilterType}
                        onChange={e => handleSelectChange('leadOwnerFilterType')}
                      />
                    </Col>
                    <Col xs={7}>
                      <Form.Control
                        type='text'
                        value={leadOwnerFilterValue}
                        onChange={e => handleChange.bind('leadOwnerFilterValue')}
                      />
                    </Col>
                  </Row>
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group>
                  <Form.Label>Sales Volume:</Form.Label>
                  <Row>
                    <Col xs={5}>
                      <Select
                        options={numberFilters}
                        value={salesFilterType}
                        onChange={e => handleSelectChange.bind('salesFilterType')}
                      />
                    </Col>
                    {salesFilterType && salesFilterType.value === 'range' ? (
                      <Fragment>
                        <Col xs={3}>
                          <Form.Control
                            type='text'
                            value={salesFilterFirstValue}
                            onChange={e => handleChange('salesFilterFirstValue')}
                          />
                        </Col>
                        <Col xs={1}>TO</Col>
                        <Col xs={3}>
                          <Form.Control
                            type='text'
                            value={salesFilterSecondValue}
                            onChange={e => handleChange('salesFilterSecondValue')}
                          />
                        </Col>
                      </Fragment>
                    ) : (
                      <Col xs={7}>
                        <Form.Control
                          type='text'
                          value={salesFilterValue}
                          onChange={e => handleChange('salesFilterValue')}
                        />
                      </Col>
                    )}
                  </Row>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={6}>
                <Form.Group>
                  <Form.Label>Active Zipcodes:</Form.Label>
                  <Row>
                    <Col xs={5}>
                      <Select
                        options={arrayFilters}
                        value={zipcodesFilterType}
                        onChange={e => handleSelectChange('zipcodesFilterType')}
                      />
                    </Col>
                    <Col xs={7}>
                      <Select
                        isMulti
                        options={zipcodes}
                        value={zipcodesFilterValue}
                        onChange={handleSelectChange('zipcodesFilterValue')}
                      />
                    </Col>
                  </Row>
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group>
                  <Form.Label>Active Neighborhoods:</Form.Label>
                  <Row>
                    <Col xs={5}>
                      <Select
                        options={arrayFilters}
                        value={areasFilterType}
                        onChange={e => handleSelectChange('areasFilterType')}
                      />
                    </Col>
                    <Col xs={7}>
                      <Select
                        isMulti
                        options={areas}
                        value={areasFilterValue}
                        onChange={e => handleSelectChange('areasFilterValue')}
                      />
                    </Col>
                  </Row>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={submitFilter()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
}

export default FilterModal