import React, { Component } from 'react'
import ProfileIcon from '../../common/ProfileIcon'
import Table from '../../Table'
import AddRecordModal from '../../common/AddRecordModal'
import {Button, Modal} from 'react-bootstrap'
import axios from 'axios'
import {connect} from 'react-redux'
import { UPDATE_INQUIRY } from '../../../../actions/type'
import LoadingScreen from '../../LoadingScreen/LoadingScreen'

export class Profile extends Component {
  constructor(props) {
    super(props)
    this.headers = [
      {
        accessor: 'date',
        label: 'Date',
        mapper: 'date'
      },
      {
        accessor: 'content',
        label: 'Content',
        mapper: (data) => data.length > 120 ? data.substring(0, 60) + '...' : data,
        className: 'profile__note-content'
      }
    ]
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    this.axiosSource = source
    this.state = {
      showAddNoteModal: false,
      showNoteDetailModal: false,
      noteOpened: '',
      chatRendered: undefined
    }
    this.handleAdd = this.handleAdd.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleAddNoteClose = this.handleAddNoteClose.bind(this)
    this.handleNoteDetailClose = this.handleNoteDetailClose.bind(this)
  }
  async renderNewProfile() {
    const data = {id: this.props.chatId}
    this.axiosSource.cancel()
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    this.axiosSource = source
    this.setState({loading: true, chatRendered: this.props.chatId})
    const res = await axios.post(`/api/comms/profile`, data, {cancelToken: this.axiosSource.token});
    const {name, notes} = res.data
    this.setState({name, notes, loading: false})
  }
  render() {
    if(this.props.chatId != this.state.chatRendered ) {
      this.renderNewProfile()
    }
    return (
      <LoadingScreen loading={this.state.loading}>
        <div className='profile__container'>
          <div className='profile__name-container'>
            <ProfileIcon name={this.state.name} size={80} />
            <div className='profile__name'>{this.state.name}</div>
          </div>
          <div className='profile__add-note-button'>
            <Button variant='success' onClick={this.handleAdd}>
              +
            </Button>
          </div>
          <Table 
            data={this.state.notes ? this.state.notes : []}
            headers={this.headers}
            pageSize={5}
            fontSize={12}
            onClickRow={(row) => this.setState({showNoteDetailModal: true, noteOpened: row.content})}
          />
          <AddRecordModal show={this.state.showAddNoteModal} handleClose={this.handleAddNoteClose} handleSubmit={this.handleSubmit}/>
          <Modal size='lg' show={this.state.showNoteDetailModal} onHide={this.handleNoteDetailClose}>
            <Modal.Header closeButton>
              <Modal.Title>Note</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {this.state.noteOpened}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleNoteDetailClose}>
                Close
              </Button>
            </Modal.Footer> 
          </Modal>
        </div>
      </LoadingScreen>
    )
  }
  async handleSubmit({type, content}) {
    const config = {headers: {'Content-Type': 'application/json'}};
    const data = {
      type,
      content,
      chatId: this.props.chatId
    }
    const body = JSON.stringify(data)
    const response = await axios.post(`/api/comms/add_note`, body, config);
    const {name, notes} = response.data
    this.setState({name, notes})
  }
  handleAddNoteClose() {
    this.setState({showAddNoteModal: false})
  }
  handleNoteDetailClose() {
    this.setState({showNoteDetailModal: false})
  }
  handleAdd() {
    this.setState({showAddNoteModal: true})
  }
}

const mapStateToProps = state => ({
  data: state.dashboard.inquiriesRaw
})

const mapDispatchToProps = dispatch => {
  return {
    updateInquiry: (payload) => dispatch({type: UPDATE_INQUIRY, payload}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
