import React , {Fragment} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth'
import PropTypes from 'prop-types'

const Navbar = ({auth:{isAuthenticated, loading}, logout}) => {
    const authLinks = (
        <ul>
            <li><Link to='/serviceList'>Service</Link></li>
            <li><Link to="/rentroll">Current Rentals</Link></li>
            <li><Link to="/acquisition">New Acquisition</Link></li>
            <li><a onClick = {logout} href='#!'>Logout</a></li>
        </ul>

    );
    const guestLinks = (
        <ul>
            <li><Link to='/profiles'>Renters</Link></li>
            <li><Link to="/register">Owners</Link></li>
            <li><Link to="/login">Vendors</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>

    );

        
    return (
        <nav className = 'navbar bg-dark'>
            <h2><Link to='/'><i className="fas fa-code"></i> ReThink PM</Link></h2>
            {!loading && (<Fragment> {isAuthenticated ? authLinks : guestLinks}</Fragment>)}
        </nav>
    )
}

Navbar.propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth:state.auth
})

export default connect(mapStateToProps, {logout} )(Navbar)

