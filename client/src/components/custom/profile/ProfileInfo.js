import React, {Component, Fragment} from 'react'
import ProfileIcon from '../common/ProfileIcon';
import {connect} from 'react-redux';
import {formatPhone, getData} from "../../../util/commonFunctions";
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
      reasonForLoss: '',
      UI: {
        statusEditable: true,
        phoneEditable: false,
      },
      profileOpened: props.inquiry,
      modalData: {},
      showPhoneChangeConfirm: false
    };
    this.makeEditable = this.makeEditable.bind(this)
    this.handleEditProfileClose = this.handleEditProfileClose.bind(this)
    this.handleEditProfile = this.handleEditProfile.bind(this)
    this.handleStatusChange = this.handleStatusChange.bind(this)
    this.handleModalInputChange = this.handleModalInputChange.bind(this)
    this.handleModalSaveData = this.handleModalSaveData.bind(this)
    this.editProfile = this.editProfile.bind(this);
    this.handleStatusEdit = this.handleStatusEdit.bind(this);
    this.confirmStatusChange = this.confirmStatusChange.bind(this);
    this.denyStatusChange = this.denyStatusChange.bind(this);
    this.handleLossChange = this.handleLossChange.bind(this);

    /*PHONE EDIT*/
    this.setPhoneInputRef = element => {
      this.phoneInput = element;
    };
    this.focusPhoneInput = () => {
      if (this.phoneInput) this.phoneInput.focus();
    }
    this.editPrimaryPhone = this.editPrimaryPhone.bind(this);

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
        ...this.state.UI,
        statusEditable: !this.state.UI.statusEditable
      }
    });
  }

  componentDidMount() {
    this.props.attributes.forEach((attribute, idx) => {
      if (attribute.editable === "phoneNumbers") {
        {this.setState( {primaryPhone: this.formatData(attribute.formatter, getData(this.props.inquiry, attribute)) })}
      }
    })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.inquiry !== this.props.inquiry) {
      this.setState({
        statusSelected: {
          label: this.props.inquiry.status[0] ? (this.props.inquiry.status[0].toUpperCase() + this.props.inquiry.status.slice(1)) : '',
          value: this.props.inquiry.status ? this.props.inquiry.status : ''
        },
        primaryPhone: this.props.inquiry.phoneNumbers ? this.formatData("formatPhone", this.props.inquiry.phoneNumbers[0].number) : '',
        UI: {
          phoneEditable: this.state.UI.phoneEditable ? this.state.UI.phoneEditable : false,
          statusEditable: this.state.UI.statusEditable ? this.state.UI.statusEditable : false
        }
      });
    }

    /*FOCUS phoneInput on edit click*/
    if (this.state.UI.phoneEditable && !prevState.UI.phoneEditable) {
      this.focusPhoneInput();
    }
  }

  editProfile(modalData) {
    fetch('http://localhost:5000/api/profile/agent/' + this.props.inquiry._id, {
      method: "put",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({
        firstName: modalData.firstName,
        lastName: modalData.lastName,
        fullName: modalData.firstName + " " + modalData.lastName,
        phone: modalData.phone,
        /* TODO: REWORK TO USE ARRAY OF OBJECTS */
        phoneNumbers: [
          {
            number: modalData.phone
          }
        ],
        status: modalData.status
      })
    }).then((res) => {
      console.log(res);
    })
  }

  handleStatusEdit() {
    this.confirmStatusChange();
    fetch('http://localhost:5000/api/profile/agent/' + this.props.inquiry._id, {
      method: "put",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({
        status: this.state.statusSelected.value,
        reasonForLoss: this.state.reasonForLoss
      })
    }).then((res) => {
      console.log(res);
      this.makeEditable();
    })
  }

  handlePhoneEdit() {
    this.confirmPrimaryPhoneEdit();
    fetch('http://localhost:5000/api/profile/agent/' + this.props.inquiry._id, {
      method: "put",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({
       phoneNumbers:  [...this.props.inquiry.phoneNumbers.map(phoneNumber => {
         return phoneNumber.isPrimary ? {...phoneNumber, number: this.state.primaryPhone} : phoneNumber
       })],

      })
    }).then((res) => {
      console.log(res);
      this.editPrimaryPhone();
    })
  }

  editPrimaryPhone() {
    this.setState({
      UI: {
        ...this.state.UI,
        phoneEditable: !this.state.UI.phoneEditable
      }
    });
  }

  confirmPrimaryPhoneEdit() {
   this.setState({
      UI: {
        ...this.state.UI,
        phoneEditable: !this.state.UI.phoneEditable
      },
     showPhoneChangeConfirm: !this.state.showPhoneChangeConfirm
    });
  }



  denyPhoneChange() {
    this.setState({
      showPhoneChangeConfirm: false,
      primaryPhone: this.props.inquiry.phoneNumbers.filter((number) => {
        if (number.isPrimary) return number
      }).map((primaryNum) => {
        return formatPhone(primaryNum.number);
      })[0]
    });
  }

  render() {
    let col1 = [];
    let col2 = [];
    let col3 = [];
    this.props.attributes.forEach((attribute, idx) => {
      if (attribute.col === 1) {
        col1.push(
          (attribute.formatter) ?
            ((attribute.editable === "phoneNumbers") ? (
              <div className={attribute.name}>
                <b>{attribute.name}:</b>
                  <input type="text" name="phonePrimary"
                         disabled={!this.state.UI.phoneEditable}
                         value={this.state.primaryPhone}
                         onChange={(evt) => this.setState({primaryPhone: evt.target.value })}
                         ref={this.setPhoneInputRef}
                         onBlur={() => this.confirmPrimaryPhoneEdit()}
                  />
                <button className='action-buttons__button singleFieldEdit'
                        onClick={() => this.editPrimaryPhone()}>
                  <i className="fas fa-pencil-alt"></i>
                </button>
                <button className='action-buttons__button addPhoneNumber'>
                  <i className="fas fa-plus"></i>
                </button>
              </div>) : (<div key={idx} dangerouslySetInnerHTML={{
              __html: (
                `<p>
                 <b>${attribute.name}:</b> ${this.formatData(attribute.formatter, getData(this.props.inquiry, attribute))}
               </p>`
              )
            }}/>))
            :
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
                      onBlur={() => this.confirmStatusChange()}
                    />
                    <button className='action-buttons__button singleFieldEdit' onClick={() => this.makeEditable()}>
                      {(this.state.UI.statusEditable) ? <i className="fas fa-pencil-alt"></i> :  <i className="fas fa-save"></i> }
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
            <button className='action-buttons__button edit-profile__button' onClick={() => this.handleEditProfile()}>
              <i className="fas fa-cogs"></i>
            </button> : ''}

        </div>

        {this.props.inquiry && this.props.isAgent ? (
          <Fragment>

            <Modal size='xl' show={this.state.showEditProfileModal} onHide={() => this.handleEditProfileClose()}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Lead</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>

                  {this.props.attributes.map((attribute, idx) => {
                    if (attribute.editable === 'input') {
                      if (attribute.accessor !== 'phone') {
                        return (<Form.Group key={`form-${idx}`}>
                          <Form.Label>{attribute.name}:</Form.Label>
                          <Form.Control type="text" name={attribute.accessor}
                                        value={(this.state.modalData[`${attribute.accessor}`]) ? (this.state.modalData[`${attribute.accessor}`]) : ''}
                                        onChange={this.handleModalInputChange}/>
                        </Form.Group>);
                      } else {
                        /*IF IS PHONE*/
                        return (<Form.Group key={`form-${idx}`} className={attribute.accessor}>
                          <Form.Group>
                            <Form.Label>{attribute.name}:</Form.Label>
                            <Form.Control type="text" name={attribute.accessor}
                                          value={(this.state.modalData[`${attribute.accessor}`]) ? (this.state.modalData[`${attribute.accessor}`]) : ''}
                                          onChange={this.handleModalInputChange}/>
                          </Form.Group>
                          <Form.Group>
                            <Form.Label>Stop texting:</Form.Label>
                            <Form.Control as="select" name="okToText"
                                          value={(this.state.modalData[`${attribute.accessor}`]) ? (this.state.modalData[`${attribute.accessor}`]) : ''}
                                          onChange={this.handleModalSelectChange}>
                              <option value={true}>No</option>
                              <option value={false}>Yes</option>
                            </Form.Control>
                          </Form.Group>
                          <Form.Group>
                            <Form.Check type="checkbox" label="Make Primary"/>
                          </Form.Group>
                          <button className='action-buttons__button addPhoneNumber' onClick={() => this.makeEditable()}>
                            <i className="fas fa-plus"></i>
                          </button>
                        </Form.Group>)
                      }
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
                    } else if (attribute.editable === 'array') {
                      console.log(attribute);
                    }

                  })}
                  {(this.state.modalData.status && this.state.modalData.status === 'notInterested') ?
                    (<Form.Group key="reason-loss">
                      <Form.Label>Reason for loss:</Form.Label>
                      <Form.Control type="text" name="reasonForLoss"
                                    value={(this.state.modalData['reason-for-loss']) ? (this.state.modalData['reason-for-loss']) : ''}
                                    onChange={this.handleModalInputChange}/>
                    </Form.Group>)
                    : ''}
                </Form>
              </Modal.Body>
              <Modal.Footer className="modalFooterBtns">
                <Button className="btn btn-primary" variant="secondary" onClick={() => this.handleModalSaveData()}>
                  <i className="fas fa-pencil-alt"></i> Save
                </Button>
                <Button className="btn btn-danger" variant="secondary" onClick={() => this.handleEditProfileClose()}>
                  Cancel
                </Button>
              </Modal.Footer>
            </Modal>
            <Modal size='md' show={this.state.showEditStatusConfirm} onHide={this.denyStatusChange}>
              <Modal.Header closeButton>
                <Modal.Title>Are you sure you want to change the status</Modal.Title>
              </Modal.Header>
              {this.state.statusSelected.value === 'notInterested' ? (
                <Modal.Body>
                  <Form>
                    <Form.Group>
                      <Form.Label>Reason for loss:</Form.Label>
                      <Form.Control type="text" name="reasonForLoss" value={this.state.reasonForLoss}
                                    onChange={this.handleLossChange}/>
                    </Form.Group>
                  </Form>
                </Modal.Body>
              ) : ''}

              <Modal.Footer className="modalFooterBtns">
                <Button className="btn btn-primary" variant="secondary" onClick={() => this.handleStatusEdit()}>
                  Yes
                </Button>
                <Button className="btn btn-danger" variant="secondary" onClick={() => this.denyStatusChange()}>
                  No
                </Button>
              </Modal.Footer>
            </Modal>
            <Modal size='md' show={this.state.showPhoneChangeConfirm} onHide={() => this.denyPhoneChange()}>
              <Modal.Header closeButton>
                <Modal.Title>Are you sure you want to change the primary phone number</Modal.Title>
              </Modal.Header>
              <Modal.Footer className="modalFooterBtns">
                <Button className="btn btn-primary" variant="secondary" onClick={() => this.handlePhoneEdit()}>
                  Yes
                </Button>
                <Button className="btn btn-danger" variant="secondary" onClick={() => this.denyPhoneChange()}>
                  No
                </Button>
              </Modal.Footer>
            </Modal>
          </Fragment>
        ) : 'nodata'}

      </div>
    )
  }

  confirmStatusChange() {
    this.setState({showEditStatusConfirm: !this.state.showEditStatusConfirm})
  }

  denyStatusChange() {
    this.setState({
      showEditStatusConfirm: false, statusSelected: {
        label: this.props.inquiry.status[0] ? (this.props.inquiry.status[0].toUpperCase() + this.props.inquiry.status.slice(1)) : '',
        value: this.props.inquiry.status ? this.props.inquiry.status : ''
      }
    })
  }

  handleLossChange(event) {
    this.setState({
      reasonForLoss: event.target.value
    })
  }

  handleModalInputChange(event) {
    this.setState({
      modalData: {
        ...this.state.modalData,
        [event.target.name]: event.target.value
      }
    })
  }

  handleModalSelectChange(event) {
    console.log(event.target.value);
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
    this.editProfile(this.state.modalData);
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
      reasonForLoss: (selectedOption.value !== 'notInterested') ? '' : this.state.reasonForLoss,
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
