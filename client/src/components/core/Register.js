import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { setAlert } from '../../actions/alert'
import { register } from '../../actions/auth'
import PropTypes from 'prop-types'



const Register = ({ setAlert, register, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        password2: '',
        owner: false,
        investor: false,
        vendor: false
        
    });

    const { name, email, phone, password, password2,owner, investor, vendor } = formData;
    
    const onChange2 = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.checked });
    }

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });


    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== password2) {
            setAlert('Passwords do not match', 'danger');
        } else {
            register({ name, email,phone, password });
        }
    }


    //Redirect if logged in
    if (isAuthenticated) {
        return <Redirect to='/dashboard' />
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={name}
                        onChange={e => onChange(e)}
                    //required 
                    />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={email}
                        onChange={e => onChange(e)}
                    //required 
                    />
                    <small className="form-text"
                    >This site uses Gravatar so if you want a profile image, use a Gravatar email
                    </small>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Mobile Phone"
                        name="phone"
                        value={phone}
                        onChange={e => onChange(e)}
                    //required 
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={e => onChange(e)}
                    //minLength="6"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        value={password2}
                        onChange={e => onChange(e)}
                    //minLength="6"
                    />
                </div>
                
                <div className="form-group">
                    <small className="form-text">Choose the option(s) that best descibe you</small>
                    <input type="checkbox" name="owner" value={owner} onChange={e => onChange2(e)}/> I am a Property Owner Looking for Property Managment Solutions<br/>
                    <input type="checkbox" name="investor" value={investor} onChange={e => onChange2(e)}/> I am Real Estate Investor Looking To Purchase My Next Deal <br/>
                    <input type="checkbox" name="vendor" value={vendor} onChange={e => onChange2(e)} /> I am Contractor Interested In Joining A network Of Service Pro's <br/>

                </div>


                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </Fragment>
    )
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { setAlert, register})(Register)
