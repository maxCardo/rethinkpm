"use client";

import { Button, Modal } from "react-bootstrap";
import React, { useRef } from "react";
import GoogleMapReact from "google-map-react";
import IconButton from "../../../../../core/IconButton/IconButton";

const StreetMapViewModal = ({
  modalOpen,
  openModal,
  activeComp,
  streetView,
  changeStreetView,
}) => {
  const apiKey = "AIzaSyCvc3X9Obw3lUWtLhAlYwnzjnREqEA-o3o";

  const defaultLat = 40.4406; // Pittsburgh, PA center
  const defaultLng = -79.9959;

  const handleApiLoaded = ({ map, maps }) => {
    if (streetView && map && maps) {
      const streetViewService = new maps.StreetViewService();
      const panorama = map.getStreetView();
      streetViewService.getPanorama(
        {
          location: { lat: defaultLat, lng: defaultLng },
          radius: 50,
        },
        (data, status) => {
          if (status === maps.StreetViewStatus.OK) {
            panorama.setPosition(data.location.latLng);
            panorama.setPov({
              heading: 34,
              pitch: 10,
            });
            panorama.setVisible(true);
          } else {
            console.error("Street View not found at this location.");
          }
        }
      );
    }
  };

  return (
    <Modal
      size="xl"
      className="StreetView__modal"
      show={modalOpen}
      onHide={() => openModal(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>{streetView ? "Street" : "Map"} View</Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ height: "80vh", width: "100%" }}>
        <div style={{ height: "100%", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: apiKey }}
            defaultCenter={{ lat: defaultLat, lng: defaultLng }}
            defaultZoom={14}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={handleApiLoaded}
          />
        </div>
      </Modal.Body>

      <Modal.Footer>
        <IconButton
          onClickFunc={() => changeStreetView(!streetView)}
          fontSize={22}
          btnClass="modal__action-button"
          variant="action-button"
          iconClass="fas fa-map-marker"
          tooltipContent={`Change to ${
            streetView ? "Map mode" : "Street mode"
          }`}
        />

        <Button
          className="real-btn"
          variant="2"
          onClick={() => openModal(false)}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default StreetMapViewModal;
