import React, {Fragment, useEffect, useRef, useState} from 'react'
import {connect} from 'react-redux'
import {Modal, Button, Form, Container, Row} from 'react-bootstrap'
import Select from "react-select";

import {addLeadSubmit, tglAddLeadMod} from '../../../../actions/profile'
import {accessData, checkBoxCheck, formatMoney} from "../../../../util/commonFunctions";
import AddFields from "./AddFields";

import {newAgent, newBuyer, newRenter} from '../../../../util/EmptyModels';

//set action to change showAddPhoneMod as false on redux

const AddLeadModal = ({profile: {_id, profileType}, addLeadSubmit, tglAddLeadMod, showMod, settings}) => {

    const trueFalse = [
        {value: "true", label: 'Yes'},
        {value: "false", label: 'No'}
    ]

    const theProfileType = useRef(profileType);
    let newProfile = {};

    if (theProfileType.current === 'agentPros') {
        newProfile = newAgent;
    } else if (theProfileType.current === 'buyerPros') {
        newProfile = newBuyer;
    } else if (theProfileType.current === 'rentPros') {
        newProfile = newRenter;
    }

    const [valid, setValid] = useState(false)
    const [formData, setFormData] = useState(newProfile)

    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const onSubmit = () => {
        tglAddLeadMod(false);
    }

    const onHide = e => {
        tglAddLeadMod(false);
        setFormData(formData);
        setValid(false);
    }

    const validate = (e) => {
        var validPhone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        setValid(!!e.target.value.match(validPhone))
    }

    const profileLabel =(theProfileType.current === 'agentPros') ? 'Agent' : (theProfileType.current === 'buyerPros') ? 'Buyer' : 'Renter';

    let checkBox = checkBoxCheck();

    useEffect(() => {

    }, []);

    return (
        <Fragment>
            <Modal size='lg' show={showMod} onHide={onHide} className="lead__modal">
                <Modal.Header closeButton>
                    <Modal.Title>Add a {`${profileLabel}`}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        {settings.map((field, index) => <AddFields key={index} passIndex={index} field={field}
                                                                   settings={settings} profile={profileType} onChange={onChange}/>)}
                    </Row>
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
    showMod: state.profile.showAddLeadMod
})

export default connect(mapStateToProps, {tglAddLeadMod, addLeadSubmit})(AddLeadModal)