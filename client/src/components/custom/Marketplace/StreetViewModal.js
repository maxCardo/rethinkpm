import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import {Modal, Button} from 'react-bootstrap';
import Loading from '../../core/LoadingScreen/Loading';
import {StreetView} from 'react-google-map-street-view';
import {closeStreetView} from "../../../actions/marketplace";

const StreetViewModal = ({  apiKey, address, modalOpen, closeStreetView}) => {

    const loading = false;

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