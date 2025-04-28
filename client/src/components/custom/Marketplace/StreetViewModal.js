import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import Loading from "../../core/LoadingScreen/Loading";
import { closeStreetView } from "../../../actions/marketplace";
import IconButton from "../../core/IconButton/IconButton";
import GoogleMapReact from "google-map-react";

const StreetViewModal = ({
  apiKey,
  address,
  zip,
  modalOpen,
  closeStreetView,
}) => {
  const [streetView, setStreetView] = useState(true);

  const loading = false;

  const getFullAddress = `${address}, Pennsylvania ${zip}`;

  // Very basic geocode just from props, normally you'd want a real geocode API
  const defaultLat = 40.2732; // Pennsylvania center
  const defaultLng = -76.8867;

  const handleApiLoaded = ({ map, maps }) => {
    if (streetView && map && maps) {
      const streetViewService = new maps.StreetViewService();
      const panorama = map.getStreetView();
      streetViewService.getPanorama(
        { location: { lat: defaultLat, lng: defaultLng }, radius: 50 },
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
      size="lg"
      className="StreetView__modal"
      show={modalOpen}
      onHide={() => {
        closeStreetView();
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>{streetView ? "Street" : "Map"} View</Modal.Title>
      </Modal.Header>

      {loading ? (
        <Loading />
      ) : (
        <Fragment>
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
              onClickFunc={() => setStreetView(!streetView)}
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
              onClick={() => {
                closeStreetView();
              }}
            >
              Close
            </Button>
          </Modal.Footer>
        </Fragment>
      )}
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  modalOpen: state.marketplace.streetViewOpen,
  address: state.marketplace.stnumber + " " + state.marketplace.ststreet,
  zip: state.marketplace.stzip,
});

export default connect(mapStateToProps, { closeStreetView })(StreetViewModal);
