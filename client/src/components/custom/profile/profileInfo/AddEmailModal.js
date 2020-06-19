import React, { Fragment, useState, useEffect, useRef } from 'react'
import {connect} from 'react-redux'
import { Modal, Button, Form } from 'react-bootstrap'
import {tglAddEmailMod, addEmailSubmit} from '../../../../actions/profile'
import {checkBoxCheck, validateEmail} from "../../../../util/commonFunctions";

//set action to change showAddPhoneMod as false on redux

const AddEmailModal = ({ profile:{_id, profileType},addEmailSubmit, tglAddEmailMod, showMod}) => {
    const theProfileType = useRef(profileType);

    const emailInput = useRef();

    const trueFalse = [
        {value: "true", label: 'Yes'},
        {value: "false", label: 'No'}
    ]

    let form = { address: '', isPrimary: false }
    const [valid, setValid] = useState(false)
    const [formData, setFormData] = useState(form)

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };

    const onSubmit = () => {
        tglAddEmailMod(false);
        addEmailSubmit( formData, _id, theProfileType.current )
        setFormData(form)
    }

    const validate = (e) => {
        setValid(validateEmail(e.target.value))
    }

    const checkBox = checkBoxCheck();

    useEffect(() => {
        if (emailInput.current && !valid) emailInput.current.focus()
        if (profileType && (theProfileType.current !== profileType)) {
            theProfileType.current = profileType;
        }
    }, [valid, profileType]);


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
                            <Form.Control type="text" name='address'
                                          className={valid ? 'valid' : 'invalid'}
                                          value={formData.address}
                                          onChange={(e) => {
                                              validate(e);
                                              onChange(e)
                                          }}
                                          autoFocus={true}
                                          ref={emailInput}/>
                        </Form.Group>
                        <Form.Group>
                            <div className="element-wrapper with--checkbox">
                                <label className="checkbox path" checked={true}  >
                                    <input type="checkbox" name='isPrimary' defaultValue={trueFalse[0].value} onChange={e => onChange(e)}/>
                                    {checkBox} &nbsp; MakePrimary
                                </label>
                            </div>
                        </Form.Group>
                    </Form.Group>

                </Modal.Body>
                <Modal.Footer className="modalFooterBtns">
                    <Button className="btn btn-primary" disabled={!valid} variant="secondary"
                            onClick={onSubmit}
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