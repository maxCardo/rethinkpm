import React, {Fragment, useEffect, useRef, useState } from 'react'
import {connect} from 'react-redux'
import {Modal, Button, Row} from 'react-bootstrap'

import {addLeadSubmit, tglAddLeadMod} from '../../../../actions/profile'
import AddFields from "./AddFields";
import {validateEmail} from "../../../../util/commonFunctions";

const AddLeadModal = ({profile: {_id, profileType}, addLeadSubmit, tglAddLeadMod, showMod, settings, profileName}) => {

    const theProfileType = useRef(profileType);
 
    const [valid, setValid] = useState(false);
    const [invalidMsgs, setInvalidMsgs] = useState([]);
    const [formData, setFormData] = useState({});

    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const onChangeArray = (name, value) => {
        setFormData({...formData, [name]: value});
    };

    const validateInput = (data) => {
        let phonesValid = true;
        let emailsValid = true;
        const validPhone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

        data.phoneNumbers.forEach((item, index) => {
            if (item.number.match(validPhone)) {
                phonesValid = phonesValid && item.number.match(validPhone);
            } else {

                let newMsgs = invalidMsgs;
                    newMsgs.push(`Phone ${index + 1} is invalid`);

                setInvalidMsgs(newMsgs);
            }

        });
        data.email.forEach((item, index) => {
            if (validateEmail(item.address)) {
                emailsValid = emailsValid && validateEmail(item.address);
            } else {

                let newMsgs = invalidMsgs;
                newMsgs.push(`Email ${index + 1} is invalid`);

                setInvalidMsgs(newMsgs);
            }
        });

        if (emailsValid && phonesValid) {
            setInvalidMsgs([]);
            setValid(true);
        }
    }

    const onSubmit = () => {
        validateInput(formData);
        setTimeout(()=>{
            if (valid) {
                tglAddLeadMod(false);
                addLeadSubmit(formData, theProfileType.current);
                setFormData({});
                setValid(false);
            }
        }, 750);

    }

    const onHide = e => {
        tglAddLeadMod(false);
        setFormData(formData);
        setValid(false);
    }

    return (
        <Fragment>
            <Modal size='lg' show={showMod} onHide={onHide} className="lead__modal">
                <Modal.Header closeButton>
                    <Modal.Title>Add a {`${profileName}`}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        {settings.map((field, index) => (!field.derived) && <AddFields key={index} passIndex={index} field={field}
                                                                   settings={settings} profile={profileType} onChange={onChange} onChangeArray={onChangeArray}/>)}
                    </Row>
                </Modal.Body>
                <Modal.Footer className="modalFooterBtns">
                    <Button className="btn btn-primary" variant="secondary"
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