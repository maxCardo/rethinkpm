import React, {Fragment, useEffect, useRef, useState} from 'react'
import {connect} from 'react-redux'
import {Modal, Button, Form} from 'react-bootstrap'
import Select from "react-select";

import {tglAddPhoneMod, addPhoneNumSubmit} from '../../../../actions/profile'
import {checkBoxCheck} from "../../../../util/commonFunctions";


//set action to change showAddPhoneMod as false on redux

const AddPhoneModal = ({profile: {_id, profileType}, addPhoneNumSubmit, tglAddPhoneMod, showMod}) => {

    const theProfileType = useRef(profileType);
    const phoneInput = useRef();

    const trueFalse = [
        {value: "true", label: 'Yes'},
        {value: "false", label: 'No'}
    ]

    let form = {number: '', okToText: trueFalse[0], isPrimary: false}
    const [valid, setValid] = useState(false)
    const [formData, setFormData] = useState(form)

    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const onSubmit = () => {
        formData.okToText = formData.okToText.value;
        tglAddPhoneMod(false);
        addPhoneNumSubmit( formData, _id, theProfileType.current);
        setFormData(form);
        setValid(false);
    }

    const onHide = e => {
        tglAddPhoneMod(false);
        setFormData(form);
        setValid(false);
    }

    const validate = (e) => {
        var validPhone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        setValid(!!e.target.value.match(validPhone))
    }


    let checkBox = checkBoxCheck();

    useEffect(() => {
        if (phoneInput.current && !valid){
            phoneInput.current.focus()
        }
        if (profileType && (theProfileType.current !== profileType)) {
            theProfileType.current = profileType;
        }
    }, [valid, profileType]);

    return (
        <Fragment>
            <Modal size='xl' show={showMod} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Add a phone number</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="addPhoneGroup">
                        <Form.Group>
                            <Form.Label>Number:</Form.Label>
                            <Form.Control type="text" name='number'
                                          className={valid ? 'valid' : 'invalid'}
                                          value={formData.number}
                                          onChange={(e) => {
                                              validate(e);
                                              onChange(e)
                                          }}
                                          ref={phoneInput}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Ok to text:</Form.Label>
                            <Select name="okToText"
                                    defaultValue={trueFalse[0]}
                                    onChange={(e) => onChange({target: {name: 'okToText', value: e}})}
                                    options={trueFalse}
                                    isSearchable={false}
                            />
                        </Form.Group>
                        <Form.Group>
                            <div className="element-wrapper with--checkbox">
                                <label className="checkbox path" checked={true}>
                                    <input type="checkbox" name='isPrimary' defaultValue={trueFalse[0].value} onChange={e => onChange(e)}/>
                                    {checkBox} &nbsp; Make Primary
                                </label>
                            </div>
                        </Form.Group>
                    </Form.Group>

                </Modal.Body>
                <Modal.Footer className="modalFooterBtns">
                    <Button className="btn btn-primary" disabled={!valid} variant="secondary"
                            onClick={onSubmit}>
                        Submit
                    </Button>
                    <Button className="btn btn-danger" variant="secondary"
                            onClick={onHide}
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
    showMod: state.profile.showAddPhoneMod
})

export default connect(mapStateToProps, {tglAddPhoneMod, addPhoneNumSubmit})(AddPhoneModal)