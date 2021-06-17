import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Table from '../../../core/Table'
import AddNoteModal from './AddNoteModel'
import '../style.css'
import IconButton from "../../../core/IconButton/IconButton";

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
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  render() {
    return (
      <div className='table-with-search__container'>
        <div className='table-with-search__controls-container'>
          <IconButton placement='bottom'
                      tooltipContent='Add new note'
                      iconClass='fas fa-plus'
                      btnClass='btn-success'
                      variant='clean'
                      onClickFunc={this.handleAdd}/>
          <Form.Control className='table-with-search__search-input' onChange={this.handleSearch}/>
        </div>
        <div className='table-with-search__table'>
          <Table {...this.props}  filter={this.state.searchString}   />
        </div>
        <AddNoteModal show={this.state.showModal} profileType={this.props.profileType} id={this.props.id} handleClose={this.handleClose} handleSubmit={this.handleSubmit}/>
      </div>
    )
  }
  handleAdd() {
    this.setState({showModal: true})
  }
  handleSearch(e) {
    this.setState({searchString: e.target.value})
  }
  handleClose() {
    this.setState({showModal: false})
  }
  handleSubmit(data) {
    console.log('handeling submit on table w search', data)
  }
}

export default TableWithSearch
