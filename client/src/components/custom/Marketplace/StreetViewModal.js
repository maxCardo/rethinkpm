import React, {Fragment, useState} from 'react'
import {connect} from 'react-redux'
import {Modal, Button} from 'react-bootstrap';
import Loading from '../../core/LoadingScreen/Loading';
import {StreetView} from 'react-google-map-street-view';
import {closeStreetView} from "../../../actions/marketplace";
import IconButton from "../../core/IconButton/IconButton";

const StreetViewModal = ({  apiKey, address, modalOpen, closeStreetView}) => {
    const [streetView, setStreetView] = useState(true);

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
                    <StreetView address={address + ', Pennsylvania'} APIkey={apiKey} streetView={streetView}
                                zoomLevel={10}/>
                </Modal.Body>
                <Modal.Footer>
                    <IconButton onClickFunc={() => {
                        console.log('wtf');
                        setStreetView(!streetView)}}
                                fontSize={16}
                                variant='action-button'
                                iconClass='fas fa-marker'
                                tooltipContent={`Change to ${streetView ? 'Street mode' : 'Map mode'}`} />

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