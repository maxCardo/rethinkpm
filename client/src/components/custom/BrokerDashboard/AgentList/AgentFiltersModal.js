import React, { Component, Fragment } from 'react'
import {Modal, Form, Button, Row, Col} from 'react-bootstrap'
import Select from 'react-select'
import status from './agentStatus'
import areas from './areas'
import zipcodes from './zipcodes'

export class AgentFiltersModal extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      officeFilterType: {label: 'Don\'t filter', value: 'noFilter'},
      officeFilterValue: '',
      statusFilterType: {label: 'Don\'t filter', value: 'noFilter'},
      statusFilterValue: [],
      leadOwnerFilterType: {label: 'Don\'t filter', value: 'noFilter'},
      leadOwnerFilterValue: '',
      salesFilterType: {label: 'Don\'t filter', value: 'noFilter'},
      salesFilterValue: '',
      salesFilterFirstValue: '',
      salesFilterSecondValue: '',
      zipcodesFilterType: {label: 'Don\'t filter', value: 'noFilter'},
      zipcodesFilterValue: [],
      areasFilterType: {label: 'Don\'t filter', value: 'noFilter'},
      areasFilterValue: []
    }
    this.state = {
      ...this.initialState
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  render() {
    const arrayFilters = [
      {label: 'Don\'t filter', value: 'noFilter'},
      {label: 'in', value: 'in'},
      {label: 'out', value: 'out'}
    ]
    const stringFilters = [
      {label: 'Don\'t filter', value: 'noFilter'},
      {label: '==', value: '=='},
      {label: 'includes', value: 'includes'}
    ]
    const numberFilters = [
      {label: 'Don\'t filter', value: 'noFilter'},
      {label: 'range', value: 'range'},
      {label: '==', value: '=='},
      {label: '!=', value: '!='},
      {label: '>', value: '>'},
      {label: '>=', value: '>='},
      {label: '<', value: '<'},
      {label: '<=', value: '<='},
    ]
    return (
      <Modal size='xl' show={this.props.show} onHide={this.handleClose}>
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
                      <Select options={arrayFilters} value={this.state.officeFilterType} onChange={this.handleSelectChange.bind(this, 'officeFilterType')}/>
                    </Col>
                    <Col xs={7}>
                      <Select isMulti options={this.props.officeOptions} value={this.state.officeFilterValue} onChange={this.handleSelectChange.bind(this, 'officeFilterValue')}/>
                    </Col>
                  </Row>
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group>
                  <Form.Label>Status:</Form.Label>
                  <Row>
                    <Col xs={5}>
                      <Select options={arrayFilters} value={this.state.statusFilterType} onChange={this.handleSelectChange.bind(this, 'statusFilterType')}/>
                    </Col>
                    <Col xs={7}>
                      <Select isMulti options={status} value={this.state.statusFilterValue} onChange={this.handleSelectChange.bind(this, 'statusFilterValue')}/>
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
                      <Select options={stringFilters} value={this.state.leadOwnerFilterType} onChange={this.handleSelectChange.bind(this, 'leadOwnerFilterType')}/>
                    </Col>
                    <Col xs={7}>
                      <Form.Control type="text" value={this.state.leadOwnerFilterValue} onChange={this.handleChange.bind(this, 'leadOwnerFilterValue')}/>
                    </Col>
                  </Row>
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group>
                  <Form.Label>Sales Volume:</Form.Label>
                  <Row>
                    <Col xs={5}>
                      <Select options={numberFilters} value={this.state.salesFilterType} onChange={this.handleSelectChange.bind(this, 'salesFilterType')}/>
                    </Col>
                    {this.state.salesFilterType && this.state.salesFilterType.value == 'range' ?
                      <Fragment>
                        <Col xs={3}>
                          <Form.Control type="text" value={this.state.salesFilterFirstValue} onChange={this.handleChange.bind(this, 'salesFilterFirstValue')}/>
                        </Col>
                        <Col xs={1}>
                          TO
                        </Col>
                        <Col xs={3}>
                          <Form.Control type="text" value={this.state.salesFilterSecondValue} onChange={this.handleChange.bind(this, 'salesFilterSecondValue')}/>
                        </Col>
                      </Fragment>
                      :
                      <Col xs={7}>
                        <Form.Control type="text" value={this.state.salesFilterValue} onChange={this.handleChange.bind(this, 'salesFilterValue')}/>
                      </Col>
                    }
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
                      <Select options={arrayFilters} value={this.state.zipcodesFilterType} onChange={this.handleSelectChange.bind(this, 'zipcodesFilterType')}/>
                    </Col>
                    <Col xs={7}>
                      <Select isMulti options={zipcodes} value={this.state.zipcodesFilterValue} onChange={this.handleSelectChange.bind(this, 'zipcodesFilterValue')}/>
                    </Col>
                  </Row>
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group>
                  <Form.Label>Active Neighborhoods:</Form.Label>
                  <Row>
                    <Col xs={5}>
                      <Select options={arrayFilters} value={this.state.areasFilterType} onChange={this.handleSelectChange.bind(this, 'areasFilterType')}/>
                    </Col>
                    <Col xs={7}>
                      <Select isMulti options={areas} value={this.state.areasFilterValue} onChange={this.handleSelectChange.bind(this, 'areasFilterValue')}/>
                    </Col>
                  </Row>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
  handleChange(property, e) {
    this.setState({[property]: e.target.value})
  }
  handleSelectChange(property, value) {
    console.log(value)
    this.setState({[property]: value})
  }
  handleClose() {
    this.setState({...this.initialState})
    this.props.handleClose()
  }
  async handleSubmit() {
    const filters = []
    if(this.state.officeFilterType.value != 'noFilter') {
      filters.push({
        field: 'office.name',
        filterType: this.state.officeFilterType.value,
        value: this.state.officeFilterValue.map((status) => status.value)
      })
    }
    if(this.state.statusFilterType.value != 'noFilter') {
      filters.push({
        field: 'status',
        filterType: this.state.statusFilterType.value,
        value: this.state.statusFilterValue.map((status) => status.value)
      })
    }
    if(this.state.leadOwnerFilterType.value != 'noFilter') {
      filters.push({
        field: 'leadOwner',
        filterType: this.state.leadOwnerFilterType.value,
        value: this.state.leadOwnerFilterValue
      })
    }
    if(this.state.salesFilterType.value != 'noFilter') {
      if(this.state.salesFilterType.value === 'range') {
        filters.push({
          field: 'sales',
          filterType: this.state.salesFilterType.value,
          value: [this.state.salesFilterFirstValue, this.state.salesFilterSecondValue]
        })
      } else {
        filters.push({
          field: 'sales',
          filterType: this.state.salesFilterType.value,
          value: this.state.salesFilterValue
        })
      }
    }
    if(this.state.zipcodesFilterType.value != 'noFilter') {
      if(this.state.zipcodesFilterType.value == this.state.areasFilterType.value) {
        const value = this.state.zipcodesFilterValue.map((status) => status.value).concat(this.state.areasFilterValue.map((status) => status.value))
        filters.push({
          field: 'areasAndZipCodesArray',
          filterType: this.state.zipcodesFilterType.value,
          value: value
        })
      } else {
        filters.push({
          field: 'areasAndZipCodesArray',
          filterType: this.state.zipcodesFilterType.value,
          value: this.state.zipcodesFilterValue.map((status) => status.value)
        })
      }
    }
    if(this.state.areasFilterType.value != 'noFilter' && this.state.zipcodesFilterType.value != this.state.areasFilterType.value) {
      filters.push({
        field: 'areasAndZipCodesArray',
        filterType: this.state.areasFilterType.value,
        value: this.state.areasFilterValue.map((status) => status.value)
      })
    }
    this.props.handleSubmit(filters)
    this.handleClose()
  }
}

export default AgentFiltersModal
