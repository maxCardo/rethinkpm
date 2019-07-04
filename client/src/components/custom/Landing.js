import React from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Landing = props => {
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

}

export default Landing
