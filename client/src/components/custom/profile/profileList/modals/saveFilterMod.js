import React, {useEffect, useState, Fragment} from 'react'
import {Modal, Form, Button} from 'react-bootstrap'

import {saveFilter} from '../../../../../actions/profile'

const SaveFilterMod = ({show, handleClose, activeFilter, profileList, profileType}) => {
    const [fltrName, setFltrName] = useState('')
    const [audience] = useState(() => profileList.list.map((profile) => profile._id))


    const onSubmit = (type) => {
            const data = {
                name: fltrName,
                profileType: profileType, 
                filterType: type,
                filters: activeFilter,
                audience: type === 'audience' ? audience : []
            }
            saveFilter(data)
            onClose()
        }

    const onClose = () => {
        setFltrName('')
        handleClose()
    } 
    
    
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
                            <Form.Control type="text" value={fltrName} onChange={e => setFltrName(e.target.value)} />
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

export default SaveFilterMod