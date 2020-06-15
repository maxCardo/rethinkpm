import React, {Fragment, useEffect, useRef, useState } from 'react'
import {connect} from 'react-redux'
import {Modal, Button, Row} from 'react-bootstrap'

import {addLeadSubmit, tglAddLeadMod} from '../../../../actions/profile'
import AddFields from "./AddFields";

const AddLeadModal = ({profile: {_id, profileType}, addLeadSubmit, tglAddLeadMod, showMod, settings, profileName}) => {

    const theProfileType = useRef(profileType);
 
    const [valid, setValid] = useState(false)
    const [formData, setFormData] = useState()

    const onChange = e => {
        console.log({'name': [e.target.name], 'value': e.target.value});

        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const onChangeArray = (name, value) => {
        console.log({'name': name, 'value': value});
        setFormData({...formData, [name]: value});
    };

    const onSubmit = () => {
        tglAddLeadMod(false);
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