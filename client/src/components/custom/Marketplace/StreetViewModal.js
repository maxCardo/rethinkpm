import React, {Fragment, useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {Modal, Button} from 'react-bootstrap';
import Loading from '../../core/LoadingScreen/Loading';
import {StreetView} from 'react-google-map-street-view';
import {closeStreetView} from "../../../actions/marketplace";
import {CLOSE_STREET_VIEW} from "../../../actions/type";

const StreetViewModal = ({  apiKey, address, modalOpen, closeStreetView}) => {

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
               show={modalOpen}
               onHide={() => {
                   closeStreetView()
               }}>
            <Modal.Header closeButton>
                <Modal.Title>Property Details</Modal.Title>
            </Modal.Header>
            {loading ? <Loading/> : <Fragment>
                <Modal.Body>
                    <StreetView address={address + ', Pennsylvania'} APIkey={apiKey} streetView
                                zoomLevel={10}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='real-btn' variant='2' onClick={() => {
                        closeStreetView()
                    }}>
                        Close
                    </Button>
                </Modal.Footer>

            </Fragment>}
        </Modal>
    );

}

function mapStateToProps(state) {
    const isOpen = state.marketplace.streetViewOpen;
    const address = state.marketplace.ststreet + ' ' + state.marketplace.stnumber;
    return { modalOpen: isOpen, address: address }
}

export default connect(mapStateToProps, {closeStreetView})(StreetViewModal);