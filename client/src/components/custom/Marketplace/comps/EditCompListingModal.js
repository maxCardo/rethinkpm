import {Button, Col, Modal, Row} from "react-bootstrap";
import React from "react";
import Form from "react-bootstrap/Form";

const EditCompListingModal = ({ modalOpen, openModal, activeComp }) => {

    return (
        <Modal size='xl'
               className='CompEdit__modal'
               show={modalOpen}
               onHide={() => {
                   openModal(false)
               }}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Comp Listing Data</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <button onClick={() => console.log(activeComp)}>Log it</button>
                <pre>
                            {JSON.stringify(activeComp)}
                        </pre>
                <Form>
                    <Row>
                        <Col md={4}>
                            <Form.Group controlId="propertyBaths">
                                <Form.Label>Baths</Form.Label>
                                <Form.Control type="number" value={activeComp.bathsFull} placeholder="Number of baths"/>
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group controlId="propertyBedrooms">
                                <Form.Label>Bedrooms</Form.Label>
                                <Form.Control type="number" value={activeComp.bedrooms} placeholder="Number of bedrooms"/>
                            </Form.Group>
                        </Col>
                        <Col md={4} className='flex-center'>
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Check me out"/>
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group controlId="propertyBedrooms">
                                <Form.Label>Total Baths</Form.Label>
                                <Form.Control type="number" value={activeComp.totalBaths}
                                              placeholder="Number of total bedrooms"/>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                <Button className='real-btn' variant='2' onClick={() => {
                    openModal(false)
                }}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
export default EditCompListingModal