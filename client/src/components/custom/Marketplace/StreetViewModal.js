import React, {Fragment, useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {Modal, Button} from 'react-bootstrap';
import Loading from '../../core/LoadingScreen/Loading';
import {StreetView} from 'react-google-map-street-view';

const StreetViewModal = ({show, apiKey, handleClose}) => {

    const loading = false;

    const globalPath = 'google.maps';
    const url = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;

    const googleMaps = {
        globalPath,
        url,
        jsonp: true,
    };

    return (


        <Modal size='xl'
               className='StreetView__modal'
               show={show}
               onHide={() => {
            handleClose();
        }}>
            <Modal.Header closeButton>
                <Modal.Title>Property Details</Modal.Title>
            </Modal.Header>
            {loading ? <Loading/> : <Fragment>
                <Modal.Body>
                    <StreetView address="100 Ontario Ct, Gibsonia" APIkey={apiKey} streetView
                                zoomLevel={10}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={() => {
                    }}>
                        Close
                    </Button>
                </Modal.Footer>

            </Fragment>}
        </Modal>
    );

}

function mapStateToProps(state) {
    const isOpen = state.StreetViewModalOpen
    return { ...isOpen }
}

export default connect(mapStateToProps)(StreetViewModal);