import React, {Fragment, useState} from 'react';
import PropTypes from 'prop-types';

const AddProfile = () => {
  const [toDateDisabled, toggleDisabled] = useState(false);

  return (
    <Fragment>
      <h1 className="large text-primary">Add Profile</h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i>
      </p>
      <small>* = required field</small>
      <form className="form">
        <div className="form-group">
          <label>Address</label>
          <input type="text" placeholder="" name="school" value="" required />
        </div>
        <div className="form-group">
          <label>City</label>
          <input type="text" placeholder="" name="degree" value="" required />
        </div>
        <div className="form-group">
          <label>State</label>
          <input type="text" placeholder="" name="fieldofstudy" value="" />
        </div>
        <div className="form-group">
          <label>Zip</label>
          <input type="text" placeholder="" name="fieldofstudy" value="" />
        </div>
        <div className="form-group">
          <label>Number of Properties Owned or Managed</label>
          <input type="text" placeholder="" name="fieldofstudy" value="" />
        </div>
        <div className="form-group">
          <label>Number of Total Units Owned or Managed</label>
          <input type="text" placeholder="" name="fieldofstudy" value="" />
        </div>

        <input
          type="submit"
          className="btn btn-primary my-1"
          value="Submit Profile & Add Property Information"
        />
      </form>
    </Fragment>
  );
};

AddProfile.propTypes = {};

export default AddProfile;
