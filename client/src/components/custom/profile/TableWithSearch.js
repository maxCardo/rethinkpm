import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Table from '../Table/index'
import AddRecordModal from './AddRecordModal'
import './style.css'

export class TableWithSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
      showModal: false
    }
    this.handleSearch = this.handleSearch.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }
  render() {
    return (
      <div className='table-with-search__container'>
        <div className='table-with-search__controls-container'>
          <Button variant='success' onClick={this.handleAdd}>
            +
          </Button>
          <Form.Control className='table-with-search__search-input' onChange={this.handleSearch}/>
        </div>
        <Table {...this.props}  filter={this.state.searchString}   />
        <AddRecordModal show={this.state.showModal} handleClose={this.handleClose}/>
      </div>
    )
  }
  handleAdd() {
    this.setState({showModal: true})
  }
  handleSearch(e) {
    console.log(e.target.value)
    this.setState({searchString: e.target.value})
  }
  handleClose() {
    this.setState({showModal: false})
  }
}

export default TableWithSearch
