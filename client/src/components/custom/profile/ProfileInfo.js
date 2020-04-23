import React, {Component, Fragment} from 'react'
import ProfileIcon from '../common/ProfileIcon';
import {connect} from 'react-redux';
import {getData} from "../../../util/commonFunctions";
import commonFormatters from "../../../util/commonDataFormatters";
import Select from "react-select";
import {agentStatus} from "../../../util/statusSchemas";
import {Button, Modal} from "react-bootstrap";
import Form from "react-bootstrap/Form";


export class ProfileInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      agentStatusSelect: agentStatus,
      statusSelected: {
        label: props.inquiry.status[0] ? (props.inquiry.status[0].toUpperCase() + props.inquiry.status.slice(1)) : '',
        value: props.inquiry.status ? props.inquiry.status : ''
      },
      UI: {
        statusEditable: true
      },
      profileOpened: props.inquiry,
      modalData: {

      }
    };
    this.makeEditable = this.makeEditable.bind(this)
    this.handleEditProfileClose = this.handleEditProfileClose.bind(this)
    this.handleEditProfile = this.handleEditProfile.bind(this)
    this.handleStatusChange = this.handleStatusChange.bind(this)
    this.handleModalInputChange = this.handleModalInputChange.bind(this)
    this.handleModalSaveData = this.handleModalSaveData.bind(this)
  }

  formatData(formatter, data) {
    if (typeof formatter == 'string') {
      return commonFormatters(formatter)(data)
    }
  }

  toggleAgentsMenu(event) {
    event.preventDefault();
    event.stopPropagation();
    if (document.getElementsByClassName('profile__main-container')[0].classList.contains('left__sidebar-open')) {
      document.getElementsByClassName('profile__main-container')[0].classList.remove('left__sidebar-open');
    } else {
      document.getElementsByClassName('profile__main-container')[0].classList.add('left__sidebar-open');
    }
  }

  toggleChat(event) {
    event.preventDefault();
    event.stopPropagation();
    if (document.getElementsByClassName('profile__main-container')[0].classList.contains('chat__sidebar-open')) {
      document.getElementsByClassName('profile__main-container')[0].classList.remove('chat__sidebar-open');
    } else {
      document.getElementsByClassName('profile__main-container')[0].classList.add('chat__sidebar-open');
    }
  }

  makeEditable() {
    this.setState({
      UI: {
        statusEditable: !this.state.UI.statusEditable
      }
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.inquiry !== this.props.inquiry) {
      this.setState({
        statusSelected: {
          label: this.props.inquiry.status[0] ? (this.props.inquiry.status[0].toUpperCase() + this.props.inquiry.status.slice(1)) : '',
          value: this.props.inquiry.status ? this.props.inquiry.status : ''
        },
        UI: {
          statusEditable: {
            label: this.props.inquiry.status[0] ? (this.props.inquiry.status[0].toUpperCase() + this.props.inquiry.status.slice(1)) : '',
            value: this.props.inquiry.status ? this.props.inquiry.status : ''
          }
        }
      });
    }
  }


  render() {

    let col1 = [];
    let col2 = [];
    let col3 = [];
    this.props.attributes.forEach((attribute, idx) => {

      if (attribute.col === 1) {
        col1.push(
          (attribute.formatter) ?
            (<div key={idx} dangerouslySetInnerHTML={{
              __html: (
                `<p>
                 <b>${attribute.name}:</b> ${this.formatData(attribute.formatter, getData(this.props.inquiry, attribute))}
               </p>`
              )
            }}/>) :
            (<p key={idx}>
              <b>{attribute.name}:</b> {getData(this.props.inquiry, attribute) ? getData(this.props.inquiry, attribute) : 'Not Implemented'}
            </p>)
        );
      } else if (attribute.col === 2) {
        col2.push(
          (attribute.formatter) ?
            (<div key={idx} dangerouslySetInnerHTML={{
              __html: (
                `<p>
                 <b>${attribute.name}:</b> ${this.formatData(attribute.formatter, getData(this.props.inquiry, attribute))}
               </p>`
              )
            }}/>) :
            (<p key={idx}>
              <b>{attribute.name}:</b> {getData(this.props.inquiry, attribute) ? getData(this.props.inquiry, attribute) : 'Not Implemented'}
            </p>)
        );
      } else if (attribute.col === 3) {
        col3.push(
          (attribute.formatter) ?
            (<div key={idx} dangerouslySetInnerHTML={{
              __html: (
                `<p>
                 <b>${attribute.name}:</b> ${this.formatData(attribute.formatter, getData(this.props.inquiry, attribute))}
               </p>`
              )
            }}/>) :
            (<div key={idx}>
              <b>{attribute.name}</b>:
              {attribute.editable
                ?
                ((attribute.editable === 'select') ? (
                  <Fragment>
                    <Select
                      className={`editable-${!this.state.UI.statusEditable} agentStatusEdit`}
                      value={this.state.statusSelected}
                      options={this.state.agentStatusSelect}
                      placeholder='Select Status'
                      isDisabled={this.state.UI.statusEditable}
                      onChange={this.handleStatusChange}
                    />
                    <button className='action-buttons__button singleFieldEdit' onClick={this.makeEditable}>
                      <i className="fas fa-pencil-alt"></i>
                    </button>
                  </Fragment>
                ) : '')
                :
                (getData(this.props.inquiry, attribute) ? getData(this.props.inquiry, attribute) : 'Not Implemented')
              }
            </div>)
        );
      }
    });
    return (
      <div className='profile-info__main-container'>
        <div className='profile-info__icon-container'>
          <ProfileIcon name={'Tests'} size={80}/>

        </div>
        <div className='profile-info__data-container'>
          {col1.length > 0 ? (<div className="column">
            <div className="column-content">
              <h2>Personal Info</h2>
              {col1}
            </div>
          </div>) : ''}
          {col2.length > 0 ? (<div className="column">
            <div className="column-content">
              <h2>Sales Info</h2>
              {col2}
            </div>
          </div>) : ''}
          {col3.length > 0 ? (<div className="column">
            <div className="column-content">
              <h2>Communication Info</h2>
              {col3}
            </div>
          </div>) : ''}
        </div>
        <div className="profile-info__actions-container">
          {this.props.isAgent ?
            (
              <a className='action-buttons__button' href='#' onClick={this.toggleAgentsMenu}>
                <i className="fas fa-user-tag"></i>
              </a>
            ) : ''}

          <a className='action-buttons__button' href='#' onClick={this.toggleChat}>
            <i className="fas fa-comments"></i>
          </a>
          <a className='action-buttons__button' href={`tel:${this.props.phoneNumber}`}>
            <i className="fas fa-phone"></i>
          </a>
          <a className='action-buttons__button' href={`mailto:${this.props.email}`}>
            <i className="fas fa-envelope"></i>
          </a>
          {this.props.isAgent ?
            <button className='action-buttons__button edit-profile__button' onClick={this.handleEditProfile}>
              <i className="fas fa-cogs"></i>
            </button> : ''}

        </div>
        <Modal size='lg' show={this.state.showEditProfileModal} onHide={this.handleEditProfileClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Lead</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            {this.props.inquiry ? (
              <Form>

                {this.props.attributes.map((attribute, idx) => {
                  if (attribute.editable === 'input') {
                    return (<Form.Group key={`form-${idx}`}>
                      <Form.Label>{attribute.name}:</Form.Label>
                      <Form.Control type="text" name={attribute.accessor} value={(this.state.modalData[`${attribute.accessor}`]) ? (this.state.modalData[`${attribute.accessor}`]) : '' } onChange={this.handleModalInputChange}/>
                    </Form.Group>);
                  } else if (attribute.editable === 'select') {
                    return (
                      <Form.Group key={`form-${idx}`}>
                        <Form.Label>{attribute.name}:</Form.Label>
                        <Form.Control as="select" value={this.state.statusSelected.value}
                                      onChange={this.handleModalStatusChange.bind(this)}>
                          {this.state.agentStatusSelect.map((item) => {
                            return <option value={item.value}>{item.label}</option>
                          })}
                        </Form.Control>
                      </Form.Group>)
                  }

                })}
                {(this.state.modalData.status && this.state.modalData.status === 'notInterested' ) ?
                  (<Form.Group key="reason-loss">
                    <Form.Label>Reason for loss:</Form.Label>
                    <Form.Control type="text" name="reasonForLoss" value={(this.state.modalData['reason-for-loss']) ? (this.state.modalData['reason-for-loss']) : '' } onChange={this.handleModalInputChange}/>
                  </Form.Group>)
                  : ''}
              </Form>
            ) : 'nodata'}
          </Modal.Body>
          <Modal.Footer className="modalFooterBtns">
            <Button className="btn btn-success" variant="secondary" onClick={this.handleModalSaveData}>
              <i className="fas fa-pencil-alt"></i> Save
            </Button>
            <Button className="btn btn-danger" variant="secondary" onClick={this.handleEditProfileClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }

  handleModalInputChange(event) {
    console.log(event.target.name);
    this.setState({
      modalData: {
        ...this.state.modalData,
        [event.target.name]: event.target.value
      }
    })
  }


  handleEditProfileClose() {
    this.setState({showEditProfileModal: false})
  }

  handleEditProfile() {
    this.setState({
      showEditProfileModal: true,
      modalData: {
        firstName: this.props.inquiry.firstName,
        lastName: this.props.inquiry.lastName,
        phone: this.props.inquiry.phone,
        emailAddress: this.props.inquiry.emailAddress,
        status: this.props.inquiry.status
      }
    })
  }

  handleModalSaveData() {
    console.log(this.state.modalData);
  }

  handleModalStatusChange(event) {
    const newValue = {label: (event.target.value[0] + event.target.value.slice(1)), value: event.target.value};
    this.setState({
      statusSelected: newValue,
      modalData: {
        ...this.state.modalData,
        status: newValue.value,
        statusSelected: newValue
      }
    });
  }

  handleStatusChange = selectedOption => {
    this.setState({
      statusSelected: selectedOption,
      modalData: {
        ...this.state.modalData,
        status: selectedOption.value,
        statusSelected: selectedOption
      }
    });
    console.log(`Option selected:`, selectedOption);
  };
}

const mapStateToProps = state => ({
  inquiries: state.dashboard.inquiriesRaw
})


export default connect(mapStateToProps)(ProfileInfo)
