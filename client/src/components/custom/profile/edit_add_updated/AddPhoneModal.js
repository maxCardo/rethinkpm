import React, {Fragment, useEffect, useRef, useState} from 'react'
import {connect} from 'react-redux'
import {Modal, Button, Form} from 'react-bootstrap'
import Select from "react-select";

import {tglAddPhoneMod, addPhoneNumSubmit} from '../../../../actions/profile'


//set action to change showAddPhoneMod as false on redux

const AddPhoneModal = ({profile: {_id, profileType}, addPhoneNumSubmit, tglAddPhoneMod, showMod}) => {
console.log(profileType);
    const phoneInput = useRef();

    let form = {number: '', okToText: '', makePrimary: ''}
    const [valid, setValid] = useState(false)
    const [formData, setFormData] = useState(form)

    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value})
    };

    const validate = (e) => {
        var validPhone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        setValid(!!e.target.value.match(validPhone))

    }
    const trueFalse = [
        {value: true, label: 'Yes'},
        {value: false, label: 'No'}
    ];

    const checkBoxCheck = (
        <svg viewBox="0 0 21 21">
            <path
                d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
        </svg>
    );

    useEffect(() => {
        if (phoneInput.current && !valid){
            phoneInput.current.focus()
        }
    });

    return (
        <Fragment>
            <Modal size='xl' show={showMod} onHide={() => tglAddPhoneMod(false)}>
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
                                    <input type="checkbox" name='makePrimary' value='true' onChange={e => onChange(e)}/>
                                    {checkBoxCheck} &nbsp; MakePrimary
                                </label>
                            </div>
                        </Form.Group>
                    </Form.Group>

                </Modal.Body>
                <Modal.Footer className="modalFooterBtns">
                    <Button className="btn btn-primary" disabled={!valid} variant="secondary"
                            onClick={() => {
                                tglAddPhoneMod(false);
                                addPhoneNumSubmit({_id, formData});
                                setFormData(form);
                            }}
                    >
                        Submit
                    </Button>
                    <Button className="btn btn-danger" variant="secondary"
                            onClick={() => {
                                tglAddPhoneMod(false);
                                setFormData(form);
                            }}
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