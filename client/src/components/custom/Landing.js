import React, {useEffect} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'; 
import {loadUser} from '../../actions/auth';
import PropTypes from 'prop-types';




const Landing = ({loadUser, isAuthenticated}) => {

    //check token and redirect if logged in
    useEffect(() => {loadUser();},[loadUser]);
    if (isAuthenticated) { return <Redirect to='/dashboard' /> }
    
    return (
        <section className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <h2 className="large">Rethink Property Managment</h2>
                    <p className="lead">
                      Simple Tech Bassed Solutions for Single Family and Multifamily Rental Owners and Residents.
                    </p>
                    <div className="buttons">
                        <Link to="/register" className="btn btn-primary">Sign Up</Link>
                        <Link to="/login" className="btn btn-light">Login</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

Landing.propTypes = {
    loadUser: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {loadUser})(Landing)
