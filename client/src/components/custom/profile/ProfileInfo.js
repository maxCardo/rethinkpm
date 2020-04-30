import React, {Component, Fragment} from 'react'
import ProfileIcon from '../common/ProfileIcon';
import {connect} from 'react-redux';
import {
  formatPhone,
  getData,
  clearPhoneFormatting,
  validatePhoneNum,
  validateEmail
} from "../../../util/commonFunctions";
import commonFormatters from "../../../util/commonDataFormatters";
import Select from "react-select";
import {agentStatus, trueFalse} from "../../../util/statusSchemas";
import {
  Button,
  Modal,
  Alert,
  Form
} from "react-bootstrap";


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
        statusEditable: false,
        phoneEditable: false,
        emailEditable: false,
        showPhoneChangeConfirm: false,
        newPhoneValid: false,
        newEmailValid: false,
        showInvalidAlert: false,
        addEmailModal: false,
        showSuccessfulUpdate: false
      },
      addPhone: {
        number: '',
        isPrimary: false,
        okToText: true,
      },
      addEmail: {
        address: '',
        isPrimary: ''
      },
      primaryPhone: (props.isAgent && props.inquiry.phoneNumbers) && this.formatData("formatPhone", [...this.props.inquiry.phoneNumbers.map(phoneNumber => {
        return phoneNumber.isPrimary ? {...phoneNumber} : ''
      })][0].number),
      primaryEmail: (props.isAgent && props.inquiry.email) ? [...this.props.inquiry.email.map(email => {
        return email.isPrimary ? {...email} : ''
      })][0].address : '',
      profileOpened: props.inquiry,
      modalData: {},
      inquiry: {},
      addPhoneNumber: false,
      reasonForLoss: '',
      invalidInfo: '',
      successfulUpdate: '',
    };
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
    this.makeStatusEditable = this.makeStatusEditable.bind(this)

    /* ADD PHONE*/
    this.handleOkToTextChange = this.handleOkToTextChange.bind(this);
    this.handleAddPhoneNumber = this.handleAddPhoneNumber.bind(this);
    this.handleIsPrimaryToggle = this.handleIsPrimaryToggle.bind(this);
    this.handleAddPhone = this.handleAddPhone.bind(this);

    /*PHONE EDIT*/
    this.setPhoneInputRef = element => {
      this.phoneInput = element;
    };
    this.focusPhoneInput = () => {
      if (this.phoneInput) this.phoneInput.focus();
    };
    this.editPrimaryPhone = this.editPrimaryPhone.bind(this);
    this.denyPhoneChange = this.denyPhoneChange.bind(this);

    /*EMAIL EDIT*/
    this.setEmailInputRef = element => {
      this.emailInput = element;
    };
    this.focusEmailInput = () => {
      if (this.emailInput) this.emailInput.focus();
    };
    this.addEmailModal = this.addEmailModal.bind(this);

    /*Add EMAIL*/
    this.handleAddEmail = this.handleAddEmail.bind(this);
    this.handleIsEmailPrimaryToggle = this.handleIsEmailPrimaryToggle.bind(this);
    this.handleAddEmailAddress = this.handleAddEmailAddress.bind(this);
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

  makeStatusEditable() {
    this.setState({
      UI: {
        ...this.state.UI,
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
        primaryPhone: this.props.inquiry && this.props.inquiry.phoneNumbers && this.formatData("formatPhone", this.props.inquiry.phoneNumbers[0].number),
        UI: {
          ...this.state.UI,
          phoneEditable: this.state.UI.phoneEditable ? this.state.UI.phoneEditable : false,
          statusEditable: this.state.UI.statusEditable ? this.state.UI.statusEditable : false
        },
        inquiry: this.props.inquiry ? this.props.inquiry : '',
      });
    }

    /*FOCUS phoneInput on edit click*/
    if (this.state.UI.phoneEditable && !prevState.UI.phoneEditable) {
      this.focusPhoneInput();
    }
    if (this.state.UI.emailEditable && !prevState.UI.emailEditable) {
      this.focusEmailInput();
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
      this.makeStatusEditable();
    })
  }

  /*Primary Phone Edit*/
  handlePhoneEdit() {
    if (validatePhoneNum(this.state.primaryPhone)) {
      this.confirmPrimaryPhoneEdit();

      fetch('http://localhost:5000/api/profile/agent/' + this.props.inquiry._id, {
        method: "put",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
          phone: this.state.primaryPhone,
          phoneNumbers: [...this.props.inquiry.phoneNumbers.map(phoneNumber => {
            return phoneNumber.isPrimary ? {
              ...phoneNumber,
              number: clearPhoneFormatting(this.state.primaryPhone)
            } : phoneNumber
          })],

        })
      }).then((res) => {
        this.setState({
          UI: {
            ...this.state.UI,
            showPhoneChangeConfirm: false,
            phoneEditable: false,
            showSuccessfulUpdate: true
          },
          successfulUpdate: 'updated the Primary Phone number'
        });
        setTimeout(() =>
          this.setState({
            UI: {
              ...this.state.UI,
              showSuccessfulUpdate: false
            }
          }), 2000)
      })
    } else {
      this.setState({
        UI: {
          ...this.state.UI,
          showPhoneChangeConfirm: false,
          showInvalidAlert: true
        },
        invalidInfo: 'Phone number'
      });
      setTimeout(() => this.denyPhoneChange(), 125)
    }
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
        showPhoneChangeConfirm: true
      },
    });
  }

  denyPhoneChange() {
    this.setState({
      primaryPhone: this.props.inquiry.phoneNumbers.filter((number) => {
        if (number.isPrimary) return number
      }).map((primaryNum) => {
        return formatPhone(primaryNum.number);
      })[0],
      UI: {
        ...this.state.UI,
        phoneEditable: false,
        showPhoneChangeConfirm: false,
      },
    })
  }

  onPrimaryPhoneEdit(evt) {
    const newPhoneNumber = evt.target.value;

    /*MIGRATE TO STATE UI OBJECT*/
    this.setState({
      UI: {
        ...this.state.UI,
        newPhoneValid: validatePhoneNum(newPhoneNumber)
      },
      primaryPhone: newPhoneNumber
    })
  }

  /*END OF PRIMARY PHONE EDIT*/

  /*ADD PHONE NUMBER*/

  /*Toggle modal*/
  addPhoneNumber() {
    this.setState({
      addPhoneNumber: !this.state.addPhoneNumber,
    });
  }

  /*Update number in state*/
  handleAddPhoneNumber(event) {
    const newPhoneNumber = event.target.value;

    this.setState({
      addPhone: {
        ...this.state.addPhone,
        number: event.target.value
      },
      UI: {
        ...this.state.UI,
        newPhoneValid: validatePhoneNum(newPhoneNumber)
      }
    })
  }

  /*Update okToTExt in state*/
  handleOkToTextChange = selectedOption => {
    this.setState(
      {
        addPhone: {
          ...this.state.addPhone,
          okToText: selectedOption.value
        }
      },
    );
  };

  /*Update isPrimary in state*/
  handleIsPrimaryToggle() {
    this.setState({
      addPhone: {
        ...this.state.addPhone,
        isPrimary: !this.state.addPhone.isPrimary
      }
    })
  }

  /*Reset state*/
  denyAddPhone() {
    this.setState({
      addPhoneNumber: false,
      addPhone: {
        number: '',
        isPrimary: false,
        okToText: true,
      }
    })
  }

  /*Send api call after confirm*/
  handleAddPhone() {
    if (validatePhoneNum(this.state.addPhone.number)) {
      /*Add number validation here*/
      let newPhoneNumbers = this.props.inquiry.phoneNumbers;
      newPhoneNumbers.push(this.state.addPhone);

      fetch('http://localhost:5000/api/profile/agent/' + this.props.inquiry._id, {
        method: "put",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
          phoneNumbers: newPhoneNumbers
        })
      }).then((res) => {

        this.setState({
          UI: {
            ...this.state.UI,
            showSuccessfulUpdate: true
          },
          successfulUpdate: 'added a Phone number',
          addPhoneNumber: false,
          addPhone: {
            number: '',
            isPrimary: false,
            okToText: true,
          }
        });
        setTimeout(() =>
          this.setState({
            UI: {
              ...this.state.UI,
              showSuccessfulUpdate: false
            }
          }), 2000);
      });
    } else {
      this.setState({
        UI: {
          ...this.state.UI,
          showInvalidAlert: true
        },
        addPhoneNumber: false,
        invalidInfo: 'added a Phone number'
      });
      setTimeout(() => this.denyAddPhone(), 125)
    }
  }

  /*END OF ADD PHONE NUMBER*/

  /*EDIT EMAIL*/

  /*Primary Email Edit*/
  handleEmailEdit() {
    if (validateEmail(this.state.primaryEmail)) {
      this.confirmPrimaryEmailEdit();

      fetch('http://localhost:5000/api/profile/agent/' + this.props.inquiry._id, {
        method: "put",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
          email: [...this.props.inquiry.email.map(email => {
            return email.isPrimary ? {...email, address: this.state.primaryEmail} : email
          })],

        })
      }).then((res) => {
        this.setState({
          UI: {
            ...this.state.UI,
            showEmailChangeConfirm: false,
            emailEditable: false,
            showSuccessfulUpdate: true,
          },
          successfulUpdate: 'updated primary email'
        });
        setTimeout(() =>
          this.setState({
            UI: {
              ...this.state.UI,
              showSuccessfulUpdate: false
            }
          }), 2000);
      })
    } else {
      this.setState({
        UI: {
          ...this.state.UI,
          showEmailChangeConfirm: false,
          showInvalidAlert: true
        },
        invalidInfo: 'Email address'
      });
      setTimeout(() => this.denyEmailChange(), 125)
    }
  }

  onPrimaryEmailEdit(evt) {
    const newEmail = evt.target.value;

    this.setState({
      UI: {
        ...this.state.UI,
        newEmailValid: validateEmail(newEmail)
      },
      primaryEmail: newEmail
    })
  }

  editPrimaryEmail() {
    this.setState({
      UI: {
        ...this.state.UI,
        emailEditable: !this.state.UI.emailEditable
      }
    });
  }

  confirmPrimaryEmailEdit() {
    this.setState({
      UI: {
        ...this.state.UI,
        showEmailChangeConfirm: true
      },
    });
  }

  denyEmailChange() {
    this.setState({
      primaryEmail: this.props.inquiry.email.filter((address) => {
        if (address.isPrimary) return address
      }).map((primaryAddress) => {
        return primaryAddress.address;
      })[0],
      UI: {
        ...this.state.UI,
        emailEditable: false,
        showEmailChangeConfirm: false,
      },
    })
  }

  /*ADD AN EMAIL */
  addEmailModal() {
    this.setState({
      UI: {
        ...this.state.UI,
        addEmailModal: !this.state.UI.addEmailModal
      }
    });
  }

  /*cancel add email*/
  denyAddEmail() {
    this.setState({
      UI: {
        ...this.state.UI,
        addEmailModal: false
      },
      addEmail: {
        number: '',
        isPrimary: false,
        okToText: true,
      }
    })
  }

  /*Update isPrimary in state*/
  handleIsEmailPrimaryToggle() {
    this.setState({
      addEmail: {
        ...this.state.addEmail,
        isPrimary: !this.state.addEmail.isPrimary
      }
    })
  }

  /*Update number in state*/
  handleAddEmailAddress(event) {
    const newEmail = event.target.value;

    this.setState({
      addEmail: {
        ...this.state.addEmail,
        address: event.target.value
      },
      UI: {
        ...this.state.UI,
        newEmailValid: validateEmail(newEmail)
      }
    })
  }


  handleAddEmail() {
    if (validateEmail(this.state.addEmail.address)) {
      let newEmails = this.props.inquiry.email;
      newEmails.push(this.state.addEmail);

      fetch('http://localhost:5000/api/profile/agent/' + this.props.inquiry._id, {
        method: "put",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
          email: newEmails
        })
      }).then((res) => {
        this.setState({
          UI: {
            ...this.state.UI,
            addEmailModal: false,
            showSuccessfulUpdate: true,
          },
          addEmail: {
            address: '',
            isPrimary: false,
          },
          successfulUpdate: 'added an Email address'
        });
        setTimeout(() =>
          this.setState({
            UI: {
              ...this.state.UI,
              showSuccessfulUpdate: false
            }
          }), 2000)
      })
    } else {
      this.setState({
        UI: {
          ...this.state.UI,
          showInvalidAlert: true,
          addEmailModal: false,
        },
        invalidInfo: 'Email Address'
      });
      setTimeout(() => this.denyAddEmail(), 125)
    }
  }

  /*END OF ADD EMAIL*/

  render() {
    const checkBoxCheck = (
      <svg viewBox="0 0 21 21">
        <path
          d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
      </svg>
    );

    let col1 = [];
    let col2 = [];
    let col3 = [];
    this.props.attributes.forEach((attribute, idx) => {
      if (attribute.col === 1) {
        col1.push(
          (attribute.formatter) ?
            ((attribute.editable === "phoneNumbers") ? (
              <div key={idx} className={attribute.name}>
                <b>{attribute.name}:</b>
                <input type="text" className={(this.state.UI.newPhoneValid) ? 'valid' : 'invalid'} name="phonePrimary"
                       disabled={!this.state.UI.phoneEditable}
                       value={this.state.primaryPhone}
                       onChange={(evt) => this.onPrimaryPhoneEdit(evt)}
                       ref={this.setPhoneInputRef}
                />
                {(!this.state.UI.phoneEditable) ? (
                  <button className='action-buttons__button singleFieldEdit'
                          onClick={() => this.editPrimaryPhone()}>
                    <i className="fas fa-pencil-alt"></i>
                  </button>
                ) : (
                  <Fragment>
                    <button className='action-buttons__button ab__confirm singleFieldEdit'
                            disabled={!this.state.UI.newPhoneValid}
                            onClick={() => this.confirmPrimaryPhoneEdit()}>
                      <i className="fas fa-check"></i>
                    </button>
                    <button className='action-buttons__button ab__cancel singleFieldEdit'
                            onClick={() => this.denyPhoneChange()}>
                      <i className="fas fa-times"></i>
                    </button>
                  </Fragment>
                )}


                <button className='action-buttons__button addPhoneNumber'
                        onClick={() => this.addPhoneNumber()}>
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
            ((attribute.editable === "emails") ? (
                  <div key={idx} className={attribute.name}>
                    <b>{attribute.name}:</b>
                    <input type="text" name="emailPrimary"
                           className={(this.state.UI.newEmailValid) ? 'valid' : 'invalid'}
                           disabled={!this.state.UI.emailEditable}
                           value={this.state.primaryEmail}
                           onChange={(evt) => this.onPrimaryEmailEdit(evt)}
                           ref={this.setEmailInputRef}
                    />
                    {(!this.state.UI.emailEditable) ? (
                      <button className='action-buttons__button singleFieldEdit'
                              onClick={() => this.editPrimaryEmail()}>
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                    ) : (
                      <Fragment>
                        <button className='action-buttons__button ab__confirm singleFieldEdit'
                                disabled={!this.state.UI.newEmailValid}
                                onClick={() => this.confirmPrimaryEmailEdit()}>
                          <i className="fas fa-check"></i>
                        </button>
                        <button className='action-buttons__button ab__cancel singleFieldEdit'
                                onClick={() => this.denyEmailChange()}>
                          <i className="fas fa-times"></i>
                        </button>
                      </Fragment>
                    )}

                    <button className='action-buttons__button addEmail'
                            onClick={() => this.addEmailModal()}>
                      <i className="fas fa-plus"></i>
                    </button>
                  </div>) :
                (<p key={idx}>
                  <b>{attribute.name}:</b> {getData(this.props.inquiry, attribute) ? getData(this.props.inquiry, attribute) : 'Not Implemented'}
                </p>)
            )
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
                ((attribute.editable === 'select') && (
                  <Fragment>
                    <Select
                      className={(!this.state.UI.statusEditable ? 'editable-false' : 'editable-true') + ' agentStatusEdit'}
                      value={this.state.statusSelected}
                      options={this.state.agentStatusSelect}
                      placeholder='Select Status'
                      isDisabled={!this.state.UI.statusEditable}
                      onChange={this.handleStatusChange}
                      isSearchable={false}
                    />
                    {(!this.state.UI.statusEditable) ? (
                      <button className='action-buttons__button singleFieldEdit'
                              onClick={() => this.makeStatusEditable()}>
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                    ) : (
                      <Fragment>
                        <button className='action-buttons__button ab__confirm singleFieldEdit'
                                onClick={() => this.confirmStatusChange()}>
                          <i className="fas fa-check"></i>
                        </button>
                        <button className='action-buttons__button ab__cancel singleFieldEdit'
                                onClick={this.denyStatusChange}>
                          <i className="fas fa-times"></i>
                        </button>
                      </Fragment>
                    )}

                  </Fragment>
                ))
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
          {col1.length > 0 && (<div className="column">
            <div className="column-content">
              <h2>Personal Info</h2>
              {col1}
            </div>
          </div>)}
          {col2.length > 0 && (<div className="column">
            <div className="column-content">
              <h2>Sales Info</h2>
              {col2}
            </div>
          </div>)}
          {col3.length > 0 && (<div className="column">
            <div className="column-content">
              <h2>Communication Info</h2>
              {col3}
            </div>
          </div>)}
        </div>
        <div className="profile-info__actions-container">
          {this.props.isAgent &&
          (
            <a className='action-buttons__button' href='#' onClick={this.toggleAgentsMenu}>
              <i className="fas fa-user-tag"></i>
            </a>
          )}

          <a className='action-buttons__button' href='#' onClick={this.toggleChat}>
            <i className="fas fa-comments"></i>
          </a>
          <a className='action-buttons__button' href={`tel:${this.state.primaryPhone}`}>
            <i className="fas fa-phone"></i>
          </a>
          <a className='action-buttons__button' href={`mailto:${this.state.primaryEmail}`}>
            <i className="fas fa-envelope"></i>
          </a>
          {this.props.isAgent &&
          <button className='action-buttons__button edit-profile__button' onClick={() => this.handleEditProfile()}>
            <i className="fas fa-cogs"></i>
          </button>}

        </div>

        {this.props.inquiry && this.props.isAgent && (
          <Fragment>
            {/*MODALS*/}
            <Modal size='xl' show={this.state.showEditProfileModal} onHide={() => this.handleEditProfileClose()}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Lead</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>

                  {this.props.attributes.map((attribute, idx) => {
                    if (attribute.editable === 'input') {
                      return (<Form.Group key={`form-${idx}`}>
                        <Form.Label>{attribute.name}:</Form.Label>
                        <Form.Control type="text" name={attribute.accessor}
                                      value={(this.state.modalData[`${attribute.accessor}`]) && (this.state.modalData[`${attribute.accessor}`])}
                                      onChange={this.handleModalInputChange}/>
                      </Form.Group>);
                    } else if (attribute.editable === 'select') {
                      return (
                        <Form.Group key={`form-${idx}`}>
                          <Form.Label>{attribute.name}:</Form.Label>
                          <Form.Control as="select" value={this.state.statusSelected.value}
                                        onChange={this.handleModalStatusChange.bind(this)}>
                            {this.state.agentStatusSelect.map((item, idx) => {
                              return <option key={idx} value={item.value}>{item.label}</option>
                            })}
                          </Form.Control>
                        </Form.Group>)
                    }
                  })}
                  {(this.state.modalData.status && this.state.modalData.status === 'notInterested') &&
                  (<Form.Group key="reason-loss">
                    <Form.Label>Reason for loss:</Form.Label>
                    <Form.Control type="text" name="reasonForLoss"
                                  value={(this.state.modalData['reason-for-loss']) && (this.state.modalData['reason-for-loss'])}
                                  onChange={this.handleModalInputChange}/>
                  </Form.Group>)}
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
              {this.state.statusSelected.value === 'notInterested' && (
                <Modal.Body>
                  <Form>
                    <Form.Group>
                      <Form.Label>Reason for loss:</Form.Label>
                      <Form.Control type="text" name="reasonForLoss" value={this.state.reasonForLoss}
                                    onChange={this.handleLossChange}/>
                    </Form.Group>
                  </Form>
                </Modal.Body>
              )}

              <Modal.Footer className="modalFooterBtns">
                <Button className="btn btn-primary" variant="secondary" onClick={() => this.handleStatusEdit()}>
                  Yes
                </Button>
                <Button className="btn btn-danger" variant="secondary" onClick={() => this.denyStatusChange()}>
                  No
                </Button>
              </Modal.Footer>
            </Modal>

            <Modal size='md' show={this.state.UI.showPhoneChangeConfirm} onHide={() => this.denyPhoneChange()}>
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

            <Modal size='md' show={this.state.UI.showEmailChangeConfirm} onHide={() => this.denyEmailChange()}>
              <Modal.Header closeButton>
                <Modal.Title>Are you sure you want to change the primary email</Modal.Title>
              </Modal.Header>
              <Modal.Footer className="modalFooterBtns">
                <Button className="btn btn-primary" variant="secondary" onClick={() => this.handleEmailEdit()}>
                  Yes
                </Button>
                <Button className="btn btn-danger" variant="secondary" onClick={() => this.denyEmailChange()}>
                  No
                </Button>
              </Modal.Footer>
            </Modal>

            <Modal size='xl' show={this.state.addPhoneNumber} onHide={() => this.denyAddPhone()}>
              <Modal.Header closeButton>
                <Modal.Title>Add a phone number</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {(this.state.inquiry.phoneNumbers && this.props.isAgent) && (
                  <Form.Group className="addPhoneGroup">
                    <Form.Group>
                      <Form.Label>Number:</Form.Label>
                      <Form.Control type="text" name='newPhone'
                                    className={this.state.UI.newPhoneValid ? 'valid' : 'invalid'}
                                    value={this.state.addPhone.number}
                                    onChange={this.handleAddPhoneNumber}/>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Ok to text:</Form.Label>
                      <Select name="okToText"
                              defaultValue={trueFalse.map((option) => {
                                if (option.value === this.state.addPhone.okToText) return option
                              })[0]}
                              options={trueFalse}
                              onChange={this.handleOkToTextChange}
                              isSearchable={false}
                      />
                    </Form.Group>
                    <Form.Group>
                      <div className="element-wrapper with--checkbox">
                        <label className="checkbox path" checked={this.state.addPhone.isPrimary}
                               onChange={this.handleIsPrimaryToggle}>
                          <input type="checkbox"/>
                          {checkBoxCheck}
                          &nbsp; MakePrimary
                        </label>
                      </div>
                    </Form.Group>
                  </Form.Group>
                )}
              </Modal.Body>
              <Modal.Footer className="modalFooterBtns">
                <Button className="btn btn-primary" disabled={!this.state.UI.newPhoneValid} variant="secondary"
                        onClick={() => this.handleAddPhone()}>
                  Yes
                </Button>
                <Button className="btn btn-danger" variant="secondary" onClick={() => this.denyAddPhone()}>
                  No
                </Button>
              </Modal.Footer>
            </Modal>

            <Modal size='lg' show={this.state.UI.addEmailModal} onHide={() => this.denyAddEmail()}>
              <Modal.Header closeButton>
                <Modal.Title>Add an email</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {this.state.inquiry.email && this.props.isAgent && (
                  <Form.Group className="addEmailGroup">
                    <Form.Group>
                      <Form.Label>Address:</Form.Label>
                      <Form.Control type="text" name='newPhone'
                                    className={this.state.UI.newEmailValid ? 'valid' : 'invalid'}
                                    value={this.state.addEmail.address}
                                    onChange={this.handleAddEmailAddress}/>
                    </Form.Group>
                    <Form.Group>
                      <div className="element-wrapper with--checkbox">
                        <label className="checkbox path" checked={this.state.addEmail.isPrimary}
                               onChange={this.handleIsEmailPrimaryToggle}>
                          <input type="checkbox"/>
                          {checkBoxCheck}
                          &nbsp; MakePrimary
                        </label>
                      </div>
                    </Form.Group>
                  </Form.Group>
                )}
              </Modal.Body>
              <Modal.Footer className="modalFooterBtns">
                <Button className="btn btn-primary" disabled={!this.state.UI.newEmailValid} variant="secondary"
                        onClick={() => this.handleAddEmail()}>
                  Yes
                </Button>
                <Button className="btn btn-danger" variant="secondary" onClick={() => this.denyAddEmail()}>
                  No
                </Button>
              </Modal.Footer>
            </Modal>
            {/*END OF MODALS*/}

            {/*ALERTS*/}
            {this.state.UI.showInvalidAlert &&
            <Alert className='invalidAlert' variant="danger" show={this.state.UI.showInvalidAlert}
                   onClose={() => this.clearAlert()} dismissible>
              <Alert.Heading>Invalid data inserted!</Alert.Heading>
              <p>
                Please insert a valid US {this.state.invalidInfo}}
              </p>
            </Alert>}

            {this.state.UI.showSuccessfulUpdate &&
            <Alert className='validAlert' variant="success" show={this.state.UI.showSuccessfulUpdate}
                   onClose={() => this.clearAlert()}>
              <Alert.Heading>Success!</Alert.Heading>
              <p>
                You have successfully {this.state.successfulUpdate}
              </p>
            </Alert>}
            {/*END OF ALERTS*/}
          </Fragment>
        )}

      </div>
    )
  }

  clearAlert() {
    this.setState({
      UI: {
        ...this.state.UI,
        showInvalidAlert: false,
        showSuccessfulUpdate: false,
      }
    });
  }

  confirmStatusChange() {
    if (this.props.inquiry.status !== this.state.statusSelected.value) {
      this.setState({showEditStatusConfirm: !this.state.showEditStatusConfirm})
    } else {
      this.denyStatusChange();
    }
  }

  denyStatusChange() {
    this.setState({
      showEditStatusConfirm: false,
      statusSelected: {
        label: this.props.inquiry.status[0] ? (this.props.inquiry.status[0].toUpperCase() + this.props.inquiry.status.slice(1)) : '',
        value: this.props.inquiry.status ? this.props.inquiry.status : ''
      },
      UI: {
        ...this.state.UI,
        statusEditable: false
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
  };
}

const mapStateToProps = state => ({
  inquiries: state.dashboard.inquiriesRaw
})


export default connect(mapStateToProps)(ProfileInfo)
