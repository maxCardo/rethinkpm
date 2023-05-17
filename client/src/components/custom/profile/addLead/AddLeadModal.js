import React, {Fragment, useEffect, useRef, useState } from 'react'
import {connect} from 'react-redux'
import {Modal, Button, Row} from 'react-bootstrap'

import {addLeadSubmit, tglAddLeadMod} from '../../../../actions/profile'
import AddFields from "./InputFields/InputFields";
import {validateEmail} from "../../../../util/commonFunctions";

const AddLeadModal = ({profile: {_id, profileType}, addLeadSubmit, tglAddLeadMod, showMod, settings, profileName}) => {

    const theProfileType = useRef(profileType);
 
    const [valid, setValid] = useState(false);
    const [formData, setFormData] = useState({});

    const onChange = async e =>  {
        await setFormData({...formData, [e.target.name]: e.target.value})
    }

    const onChangeArray = (name, value) => {
        setFormData({...formData, [name]: value});
    };

    const validateInput = (phoneNumbers, emails) => {
        let phonesValid = true;
        let emailsValid = true;
        const validPhone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

        if (phoneNumbers) {
            phoneNumbers.forEach((item) => {
                if (!!item.number.match(validPhone) === false && item.number !== '') { phonesValid = false}
            });
        }
        

        if (emails) {
            emails.forEach((item, index) => {
                const valid = validateEmail(item.address)
                if (!valid && (item.address !== '')) {
                    emailsValid = false
                }
            });
        }

        (emailsValid && phonesValid) ? setValid(true) : setValid(false)
    }

    const onSubmit = () => {

        if (valid) {
            tglAddLeadMod(false);
            addLeadSubmit(formData, theProfileType.current);
            setFormData({});
            setValid(false);
        }

    }

    const onHide = e => {
        console.log('hide')
        tglAddLeadMod(false);
        setFormData({});
        setValid(false);
    }

    useEffect(() => {
        validateInput(formData.phoneNumbers, formData.email);
    }, [formData.phoneNumbers, formData.email]);

    return (
        <Fragment>
            <Modal size='lg' show={showMod} onHide={onHide} className="lead__modal">
                <Modal.Header closeButton>
                    <Modal.Title>Add a {`${profileName}`}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        {settings.profileInfo.map((field, index) => (!field.derived) && <AddFields key={index} passIndex={index} field={field}
                                                                   settings={settings} profile={profileType} onChange={onChange} onChangeArray={onChangeArray}/>)}
                    </Row>
                </Modal.Body>
                <Modal.Footer className="modalFooterBtns">
                    <Button className="btn btn-primary" variant="secondary"
                            disabled={!valid}
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