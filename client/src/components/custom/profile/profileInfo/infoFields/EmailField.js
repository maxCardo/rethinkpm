import React, {Fragment, useEffect, useRef, useState} from 'react'
import { connect } from 'react-redux';
import {validateEmail} from '../../../../../util/commonFunctions'
import {Button, Modal} from "react-bootstrap";
import {tglAddEmailMod, updateEmail} from "../../../../../actions/profile";
import PropTypes from 'prop-types';
import IconButton from "../../../../core/IconButton";


const EmailField = ({updateEmail, tglAddEmailMod, field, data}) => {

    let profileType = useRef(data.profileType);
    const profileId = useRef(data._id);
    const emailInput = useRef();

    let email = data.email.length ? data.email.find((address) => address.isPrimary).address : 'no email on file'

    const [edit, toggleEdit] = useState(false);
    const [emailValid, setEmailValid] = useState(true);
    const [editEmail, setEditEmail] = useState(email);
    const [showConfModal, setConfModal] = useState(false);
    const [disableEdit, setDisableEdit] = useState(email === 'no email on file');

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
        updateEmail({email: postEmails}, data._id, profileType.current);
        toggleEdit(false);
        setConfModal(false);
    }


    useEffect(() => {
        setEditEmail(email);
        if (emailInput.current && edit) {
            emailInput.current.focus();
        }
        if (data.profileType && (profileType.current !== data.profileType)) {
            profileType.current = data.profileType;
        }
        if (data._id && (profileId.current !== data._id)) {
            setDisableEdit((email === 'no email on file'));
            profileId.current = data._id;
            toggleEdit(false);
        }
    }, [edit, email, data.profileType, data._id]);

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
                {!disableEdit && (!edit  ? (
                    <IconButton placement='bottom'
                                tooltipContent='Edit primary email'
                                id='edit-primary-email-tooltip'
                                iconClass='fas fa-pencil-alt'
                                btnClass='singleFieldEdit'
                                onClickFunc={ () => toggleEdit(true) } />
                ) : (
                    <Fragment>
                        <IconButton placement='bottom'
                                    tooltipContent='Confirm new primary email'
                                    id='confirm-email-change-tooltip'
                                    iconClass='fas fa-check'
                                    isDisabled={!emailValid}
                                    btnClass='singleFieldEdit btn-success'
                                    onClickFunc={() => {
                                        editEmail !== email ? setConfModal(true) : toggleEdit(false)
                                    }}/>
                        <IconButton placement='bottom'
                                    tooltipContent='Cancel change'
                                    iconClass='fas fa-times'
                                    btnClass='ab_cancel singleFieldEdit'
                                    onClickFunc={() => {
                                        toggleEdit(false);
                                        editEmailFunc(email)
                                    }}/>
                    </Fragment>
                ))}

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