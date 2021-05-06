import {Button, Modal} from "react-bootstrap";
import Slider from "react-slick";
import React from "react";

const GalleryModal = ({modalOpen, openModal, activeComp, sliderSettings}) => {

    return (
        <>
            <link
                rel="stylesheet"
                type="text/css"
                charSet="UTF-8"
                href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
            />
            <link
                rel="stylesheet"
                type="text/css"
                href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
            />
            <Modal size='xl'
                   className='Gallery__modal'
                   show={modalOpen}
                   onHide={() => {
                       console.log(activeComp)
                       openModal(false)
                   }}>
                <Modal.Header closeButton>
                    <Modal.Title>Gallery</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Slider {...sliderSettings}>
                        {activeComp && activeComp.images && activeComp.images.map((item, index) => (
                            <img key={index} src={item}/>
                        ))}
                    </Slider>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='real-btn' variant='2' onClick={() => {
                        openModal(false)
                    }}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default GalleryModal