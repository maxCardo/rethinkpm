import React, {useState, Fragment} from 'react'
import {Modal, Form, Button} from 'react-bootstrap'

const SaveFilterMod = ({show, handleClose}) => {
    const [fltrName, setFltrName] = useState('')
    const save = (e) => {console.log('running save func: ', e);}
    
    
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
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => save('filter')}>
                        Save As Filter
                    </Button>
                    <Button variant="primary" onClick={() => save('audience')}>
                        Save As Audience
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    )
}

export default SaveFilterMod