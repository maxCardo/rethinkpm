import {Button, Modal} from "react-bootstrap";
import React from "react";
import {StreetView} from "react-google-map-street-view";
import IconButton from "../../../core/IconButton/IconButton";

const StreetMapViewModal = ({ modalOpen, openModal, activeComp, streetView, changeStreetView }) => {

    const apiKey = 'AIzaSyCvc3X9Obw3lUWtLhAlYwnzjnREqEA-o3o'
    const address = `${activeComp.streetNumber} ${activeComp.streetName}, Pittsburg, Pennsylvania`

    return (
        <Modal size='xl'
               className='StreetView__modal'
               show={modalOpen}
               onHide={() => {
                   console.log(activeComp)
                   openModal(false)
               }}>
            <Modal.Header closeButton>
                <Modal.Title>{streetView ? 'Street' : 'Map'} View </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <StreetView address={address + ' ' + activeComp.zipcode} APIkey={apiKey}
                            streetView={streetView}
                            zoomLevel={10}/>
            </Modal.Body>
            <Modal.Footer>
                <IconButton onClickFunc={() => changeStreetView(!streetView)}
                            fontSize={22}
                            btnClass='modal__action-button'
                            variant='action-button'
                            iconClass='fas fa-map-marker'
                            tooltipContent={`Change to ${streetView ? 'Map mode' : 'Street mode'}`}/>

                <Button className='real-btn' variant='2' onClick={() => {
                    openModal(false)
                }}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default StreetMapViewModal