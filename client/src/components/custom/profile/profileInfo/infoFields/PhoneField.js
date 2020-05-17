import React, {Fragment, useState, useEffect, useRef} from 'react'
import {connect} from 'react-redux'
import {Modal, Button} from 'react-bootstrap'

import {tglAddPhoneMod} from '../../../../../actions/profile'
import PropTypes from "prop-types";

//crate useEffect on load  to find primary number and set var
//action/reducer/api EP for handling add and editPrime phone num

//ToDO: for future. add dropdown arrow to show other phone numbers and checkbox to make primary

const PhoneField = ({tglAddPhoneMod, data}) => {

    const phoneInput = useRef();

    let phone = (data.phoneNumbers.length && data.phoneNumbers.find((phone) => phone.isPrimary)) ? data.phoneNumbers.find((phone) => phone.isPrimary).number : 'no phone on file';

    const [edit, toggleEdit] = useState(false)
    const [phoneValid, setPhoneValid] = useState(true)
    const [showConfModal, setConfModal] = useState(false)
    const [editPhone, setEditPhone] = useState('4125138992')

    const editPhonefunc = async (e) => {
        setEditPhone(e)
        var validPhone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        setPhoneValid(!!e.match(validPhone))
    }

    /*TODO: NEEDS AN ACTION*/
    const editPrimePhone = () => {
        const postPhones = data.phoneNumbers.map((item) => {
            if (item.isPrimary) {
                item.number = editPhone;
                return item
            } else {
                return item
            }
        })
        //updatePhone({phoneNumbers: postPhones}, data._id);
        toggleEdit(false);
        setConfModal(false);
    }


    useEffect(() => {
        //get primary number
        //format for dom
        if (phoneInput.current && edit) {
            phoneInput.current.focus();
        }
    }, [edit])

    return (
        <Fragment key="phoneNumber">
            <div className='Phone'>
                <b>Phone:&nbsp;</b>
                <input
                    type='text'
                    className={phoneValid ? 'valid' : 'invalid'}
                    name='phonePrimary'
                    disabled={!edit}
                    value={edit ? editPhone : phone}
                    onChange={(e) => editPhonefunc(e.target.value)}
                    ref={phoneInput}
                />
                {!edit ? (
                    <button className='action-buttons__button singleFieldEdit' onClick={() => toggleEdit(true)}>
                        <i className='fas fa-pencil-alt'></i>
                    </button>
                ) : (
                    <Fragment>
                        <button
                            className='action-buttons__button ab__confirm singleFieldEdit'
                            disabled={!phoneValid}
                            onClick={() => {
                                /*TODO: Needs to be addressed when we consider formatting for entry*/
                                editPhone !== phone ? setConfModal(true) : toggleEdit(false)
                            }}
                        >
                            <i className='fas fa-check'></i>
                        </button>
                        <button className='action-buttons__button ab__cancel singleFieldEdit'
                                onClick={() => {
                                    toggleEdit(false);
                                    editPhonefunc(phone)
                                }}
                        >
                            <i className='fas fa-times'></i>
                        </button>
                    </Fragment>
                )}
                <button
                    className='action-buttons__button addPhoneNumber'
                    onClick={() => {
                        toggleEdit(false);
                        editPhonefunc(phone);
                        tglAddPhoneMod(true)
                    }}
                >
                    <i className='fas fa-plus'></i>
                </button>
            </div>

            <Modal size='md' show={showConfModal} onHide={() => {
                editPhonefunc(phone);
                setConfModal(false)
            }}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure you want to change the primary phone number</Modal.Title>
                </Modal.Header>
                <Modal.Footer className="modalFooterBtns">
                    <Button className="btn btn-primary" variant="secondary" onClick={() => editPrimePhone()}>
                        Confirm
                    </Button>
                    <Button className="btn btn-danger" variant="secondary" onClick={() => {
                        toggleEdit(false);
                        editPhonefunc(phone);
                        setConfModal(false)
                    }}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    )
}

PhoneField.propTypes = {
    tglAddPhoneMod: PropTypes.func.isRequired,
    //updatePhone: PropTypes.func.isRequired, NOT IMPLEMENTED
}

export default connect(null, {tglAddPhoneMod})(PhoneField)