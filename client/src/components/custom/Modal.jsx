import React from 'react';
import PropTypes from 'prop-types';

const Modal = (props) => {
  return (
    <div className="popup-modal">
      <div className="modal-content">
        <span
          id="closeBtn"
          className="closeX closeBtn "
          onClick={props.closeMod}
        >
          &times;
        </span>
        <form className="modal-form">
          <div className="form-group col-md-6">
            <h4>Set Appointment Date & Time</h4>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="prospectName">Prospect Name</label>
              <input type="text" className="form-control" />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="item2"> Item 2</label>
              <input type="text" className="form-control" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

Modal.propTypes = {};

export default Modal;
