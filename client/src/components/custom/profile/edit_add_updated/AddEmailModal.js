import React, { Fragment, useState, useEffect, useRef } from 'react'
import {connect} from 'react-redux'
import { Modal, Button, Form } from 'react-bootstrap'
import {tglAddEmailMod, addEmailSubmit} from '../../../../actions/profile'
import {validateEmail} from "../../../../util/commonFunctions";

//set action to change showAddPhoneMod as false on redux

const AddEmailModal = ({ profile:{_id},addEmailSubmit, tglAddEmailMod, showMod}) => {

    const emailInput = useRef();

    useEffect(() => {
        if (emailInput.current !== undefined && !valid) emailInput.current.focus()
    });

    let form = { emailAddress: '', makePrimary: '' }
    const [valid, setValid] = useState(false)
    const [formData, setFormData] = useState(form)

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };

    const validate = (e) => {
        setValid(validateEmail(e.target.value))
    }

    const checkBoxCheck = (
        <svg viewBox="0 0 21 21">
            <path
                d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
        </svg>
    );


    return (
        <Fragment>
            <Modal size='lg' show={showMod} onHide={() => tglAddEmailMod(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add an email</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="addPhoneGroup">
                        <Form.Group>
                            <Form.Label>Address:</Form.Label>
                            <Form.Control type="text" name='emailAddress'
                                          className={valid ? 'valid' : 'invalid'}
                                          value={formData.emailAddress}
                                          onChange={(e) => { validate(e); onChange(e) }}
                                          autoFocus={true}
                                          ref={emailInput}/>
                        </Form.Group>
                        <Form.Group>
                            <div className="element-wrapper with--checkbox">
                                <label className="checkbox path" checked={true}  >
                                    <input type="checkbox" name='makePrimary' value='true' onChange={e => onChange(e)}/>
                                    {checkBoxCheck} &nbsp; MakePrimary
                                </label>
                            </div>
                        </Form.Group>
                    </Form.Group>

                </Modal.Body>
                <Modal.Footer className="modalFooterBtns">
                    <Button className="btn btn-primary" disabled={!valid} variant="secondary"
                            onClick={() => { tglAddEmailMod(false); addEmailSubmit({_id, formData}); setFormData(form)}}
                    >
                        Submit
                    </Button>
                    <Button className="btn btn-danger" variant="secondary"
                            onClick={() => { tglAddEmailMod(false); setFormData(form); }}
                    >
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    )
}

const mapStateToProps = state => ({
    profile: state.profile.activeProfile,
    showMod: state.profile.showAddEmailMod
})

export default connect(mapStateToProps, { tglAddEmailMod, addEmailSubmit })(AddEmailModal)