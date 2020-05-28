import React, {Fragment, useEffect, useRef, useState} from 'react'
import { connect } from 'react-redux';
import {validateEmail} from '../../../../../util/commonFunctions'
import {Button, Modal} from "react-bootstrap";
import {tglAddEmailMod, updateEmail} from "../../../../../actions/profile";
import PropTypes from 'prop-types';


const EmailField = ({updateEmail, tglAddEmailMod, field, data}) => {

    let profileType = data.profileType && data.profileType;

    const emailInput = useRef();

    let email = data.email.length ? data.email.find((address) => address.isPrimary).address : 'no email on file'

    const [edit, toggleEdit] = useState(false);
    const [emailValid, setEmailValid] = useState(true);
    const [editEmail, setEditEmail] = useState(email);
    const [showConfModal, setConfModal] = useState(false);

    const editEmailFunc = async (email) => {
        const newEMail = email;
        setEditEmail(newEMail);
        setEmailValid(validateEmail(newEMail))
    }

    const editPrimaryEmail = () => {
        const postEmails = data.email.map((item) => {
            if (item.isPrimary) {
                item.address = editEmail;
                return item
            } else {
                return item;
            }
        })
        updateEmail({email: postEmails}, data._id, profileType);
        toggleEdit(false);
        setConfModal(false);
    }


    useEffect(() => {
        setEditEmail(email);
        if (emailInput.current && edit) {
            emailInput.current.focus();
        }
        if (data.profileType && (profileType !== data.profileType)) {
            profileType = data.profileType;
        }
    }, [edit, email, data.profileType]);

    return (
        <Fragment key="email">
            <div className={field.name}>
                <b>{field.name}:</b>
                <input type="text" name="emailPrimary"
                       className={emailValid ? 'valid' : 'invalid'}
                       disabled={!edit}
                       value={edit ? editEmail : email}
                       onChange={(evt) => editEmailFunc(evt.target.value)}
                        ref={emailInput}
                />
                {!edit ? (
                    <button className='action-buttons__button singleFieldEdit' onClick={() => toggleEdit(true)}>
                        <i className='fas fa-pencil-alt'></i>
                    </button>
                ) : (
                    <Fragment>
                        <button
                            className='action-buttons__button ab__confirm singleFieldEdit'
                            disabled={!emailValid}
                            onClick={() => {
                                editEmail !== email ? setConfModal(true) : toggleEdit(false)
                            }}
                        >
                            <i className='fas fa-check'></i>
                        </button>
                        <button className='action-buttons__button ab__cancel singleFieldEdit'
                                onClick={() => {
                                    toggleEdit(false);
                                    editEmailFunc(email)
                                }}
                        >
                            <i className='fas fa-times'></i>
                        </button>
                    </Fragment>
                )}

                <button className='action-buttons__button addEmail'
                        onClick={() => {
                            toggleEdit(false);
                            editEmailFunc(email);
                            tglAddEmailMod(true)
                        }}>
                    <i className="fas fa-plus"></i>
                </button>
            </div>

            <Modal size='md' show={showConfModal} onHide={() => {
                editEmailFunc(email);
                setConfModal(false)
            }}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure you want to change the primary email</Modal.Title>
                </Modal.Header>
                <Modal.Footer className="modalFooterBtns">
                    <Button className="btn btn-primary" variant="secondary" onClick={() => editPrimaryEmail()}>
                        Confirm
                    </Button>
                    <Button className="btn btn-danger" variant="secondary" onClick={() => {
                        toggleEdit(false);
                        editEmailFunc(email);
                        setConfModal(false)
                    }}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    )
}

EmailField.propTypes ={
    tglAddEmailMod: PropTypes.func.isRequired,
    updateEmail: PropTypes.func.isRequired,
}

export default connect(null, {tglAddEmailMod, updateEmail})(EmailField)