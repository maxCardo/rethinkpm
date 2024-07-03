import React, {Fragment, useState} from 'react'
import {connect} from 'react-redux'
import {Modal, Button} from 'react-bootstrap';
import Loading from '../../core/LoadingScreen/Loading';
// import {StreetView} from 'react-google-map-street-view';
import {closeStreetView} from "../../../actions/marketplace";
import IconButton from "../../core/IconButton/IconButton";

const StreetViewModal = ({  apiKey, address, zip, modalOpen, closeStreetView}) => {
    const [streetView, setStreetView] = useState(true);
    console.log("zip: ", zip)
    const loading = false;

    return (

        <Modal size='lg'
               className='StreetView__modal'
               show={modalOpen}
               onHide={() => {
                   closeStreetView()
               }}>
            <Modal.Header closeButton>
                <Modal.Title>{streetView ? 'Street' : 'Map'} View </Modal.Title>
            </Modal.Header>
            {loading ? <Loading/> : <Fragment>
                <Modal.Body>
                    {/* <StreetView address={address + ', Pennsylvania' + ' ' + zip } APIkey={apiKey} streetView={streetView}
                                zoomLevel={10}/> */}
                </Modal.Body>
                <Modal.Footer>
                    <IconButton onClickFunc={() => setStreetView(!streetView) }
                                fontSize={22}
                                btnClass='modal__action-button'
                                variant='action-button'
                                iconClass='fas fa-map-marker'
                                tooltipContent={`Change to ${streetView ? 'Map mode' : 'Street mode'}`} />

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

// function mapStateToProps(state) {
//     const isOpen = state.marketplace.streetViewOpen;
//     const address = state.marketplace.stnumber + ' ' + state.marketplace.ststreet;
//     const zip = state.marketplace.stzip
//     return { modalOpen: isOpen, address: address }
// }

const mapStateToProps = state => ({
    modalOpen : state.marketplace.streetViewOpen,
    address : state.marketplace.stnumber + ' ' + state.marketplace.ststreet,
    zip : state.marketplace.stzip
})

export default connect(mapStateToProps, {closeStreetView})(StreetViewModal);