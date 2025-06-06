import React, { Fragment, useState } from "react";
import { Link, Navigate } from "react-router-dom"; // ✅ correct import
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    password2: "",
    owner: false,
    investor: false,
    vendor: false,
  });

  const { name, email, phone, password, password2, owner, investor, vendor } =
    formData;

  const onChange2 = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      register({ name, email, phone, password });
    }
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />; // ✅ use Navigate instead of Redirect
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Mobile Phone"
            name="phone"
            value={phone}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <small className="form-text">
            Choose the option(s) that best describe you
          </small>
          <input
            type="checkbox"
            name="owner"
            checked={owner}
            onChange={onChange2}
          />{" "}
          I am a Property Owner Looking for Property Management Solutions
          <br />
          <input
            type="checkbox"
            name="investor"
            checked={investor}
            onChange={onChange2}
          />{" "}
          I am a Real Estate Investor Looking To Purchase My Next Deal
          <br />
          <input
            type="checkbox"
            name="vendor"
            checked={vendor}
            onChange={onChange2}
          />{" "}
          I am a Contractor Interested In Joining A Network Of Service Pro's
          <br />
        </div>

        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
