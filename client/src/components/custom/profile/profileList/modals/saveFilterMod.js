import React, {useEffect, useRef, useState, Fragment} from 'react'
import {Modal, Form, Button} from 'react-bootstrap'
import {connect} from 'react-redux'

import {saveFilter} from '../../../../../actions/profile'

const SaveFilterMod = ({show, handleClose, activeFilter, profileList, profileType, saveFilter}) => {
    const [fltrName, setFltrName] = useState('')
    const [audience] = useState(() => profileList.list.map((profile) => profile._id))
    const nameInput = useRef();

    const onSubmit = (type) => {
            const data = {
                name: fltrName,
                filters: activeFilter,
                audience: type === 'audience' ? audience : []
            }
            saveFilter(data, type, profileType)
            onClose()
        }

    const onClose = () => {
        setFltrName('')
        handleClose()
    }

    useEffect(() => {
        if (nameInput.current) {
            nameInput.current.focus();
        }
    });
    
    return (
        <Fragment>
            <Modal size='lg' show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Save Filter</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Name:</Form.Label>
                            <Form.Control type="text" value={fltrName} onChange={e => setFltrName(e.target.value)} ref={nameInput} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => onClose()}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => onSubmit('filter')}>
                        Save As Filter
                    </Button>
                    <Button variant="primary" onClick={() => onSubmit('audience')}>
                        Save As Audience
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    )
}


export default connect(null, {saveFilter})(SaveFilterMod)