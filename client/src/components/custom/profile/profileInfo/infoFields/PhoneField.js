import React, {Fragment, useState, useEffect, useRef} from 'react'
import {connect} from 'react-redux'
import {Modal, Button} from 'react-bootstrap'

import {tglAddPhoneMod} from '../../../../../actions/profile'
import {formatPhone} from '../../../../../util/commonFunctions'
import PropTypes from "prop-types";
import {updatePhone} from "../../../../../actions/profile";

//crate useEffect on load  to find primary number and set var
//action/reducer/api EP for handling add and editPrime phone num

//ToDO: for future. add dropdown arrow to show other phone numbers and checkbox to make primary

const PhoneField = ({updatePhone, tglAddPhoneMod, data}) => {

    const profileType = useRef(data.profileType);
    const profileId = useRef(data._id);
    const phoneInput = useRef();

    let phone = (data.phoneNumbers.length && data.phoneNumbers.find((phone) => phone.isPrimary)) ? data.phoneNumbers.find((phone) => phone.isPrimary).number : 'no phone on file';

    const [edit, toggleEdit] = useState(false)
    const [phoneValid, setPhoneValid] = useState(true)
    const [showConfModal, setConfModal] = useState(false)
    const [editPhone, setEditPhone] = useState('4125138992')
    const [disableEdit, setDisableEdit] = useState(phone === 'no phone on file');


    const editPhonefunc = (e) => {
        setEditPhone(e)
        var validPhone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        setPhoneValid(!!e.match(validPhone))
    }

    const editPrimePhone = (proType) => {
        const postPhones = data.phoneNumbers.map((item) => {
            if (item.isPrimary) {
                item.number = editPhone;
                return item
            } else {
                return item
            }
        })
        updatePhone({phoneNumbers: postPhones}, data._id, proType);
        toggleEdit(false);
        setConfModal(false);
    }

    useEffect(() => {
        //get primary number
        //format for dom
        setEditPhone(phone);
        if (phoneInput.current && edit) {
            phoneInput.current.focus();
        }
        if (data.profileType && (profileType.current !== data.profileType)) {
            profileType.current = data.profileType;
        }
        if (data._id && (profileId.current !== data._id)) {
            setDisableEdit(phone === 'no phone on file');
            profileId.current = data._id;
            toggleEdit(false);
        }
    }, [edit, phone, data.profileType, data._id]);

    return (
        <Fragment key="phoneNumber">
            <div className='Phone'>
                <b>Phone:&nbsp;</b>
                <input
                    type='text'
                    className={phoneValid ? 'valid' : 'invalid'}
                    name='phonePrimary'
                    disabled={!edit}
                    value={edit ? editPhone : (phone !== 'no phone on file') ? formatPhone(phone) : phone}
                    onChange={(e) => editPhonefunc(e.target.value)}
                    ref={phoneInput}
                />
                {!disableEdit && (!edit ? (
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
                ))}
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
                    <Button className="btn btn-primary" variant="secondary" onClick={() => editPrimePhone(profileType.current)}>
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
    updatePhone: PropTypes.func.isRequired,
}

export default connect(null, {tglAddPhoneMod, updatePhone})(PhoneField)