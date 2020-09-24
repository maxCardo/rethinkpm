import React, {Fragment, useState} from 'react'
import {Modal, Button} from 'react-bootstrap';
import Loading from '../../core/LoadingScreen/Loading';
import Iframe from "../../core/Iframe";
import {Link} from "react-router-dom";

const PropertyDetailsModal = ({  show, handleClose, iframeTarget }) => {
    const loading = false;

    const onLoadFunc = () => {
        console.log("From frame, needs to be extended to access html on frame.");
    }

    return (

        <Modal size='xl'
               className='PropertyDetails__modal'
               show={show}
               onHide={() => {
                   handleClose()
               }}>
            <Modal.Header closeButton>
                <nav className='navbar bg-dark'>
                    <h2><Link to='/'><i className="fas fa-code"></i> ReThink PM</Link> <span className='Iframe__title'>Showing property details from website</span></h2>
                </nav>

            </Modal.Header>
            {loading ? <Loading/> : <Fragment>
                <Modal.Body>
                    <Iframe onLoad={onLoadFunc} src={iframeTarget} />
                </Modal.Body>
                <Modal.Footer>
                    <Button className='real-btn' variant='2' onClick={() => {
                        handleClose()
                    }}>
                        Close
                    </Button>
                </Modal.Footer>

            </Fragment>}
        </Modal>
    );
}



export default PropertyDetailsModal;