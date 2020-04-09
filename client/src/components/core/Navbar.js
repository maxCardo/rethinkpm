import React , {Fragment, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth'
import PropTypes from 'prop-types'
import {loadUser} from '../../actions/auth';
import {getCookie} from '../../util/cookies'

const Navbar = ({auth:{isAuthenticated, loading, loginInProgress}, logout}) => {
    useEffect(() => {
        loadUser();    
    }, [loadUser]);
    let history = useHistory()
    const handleLogout = () => {
      logout()
    }
    const authLinks = (
        <ul>
            <li><Link to='/brokerLeads'>Broker Leads</Link></li>
            <li><Link to='/crm'>Dashboard</Link></li>
            <li><Link to='/chat'>Chat</Link></li>
            <li><Link to='/services'>Service</Link></li>
            {/* <li><Link to="/rentroll">Current Rentals</Link></li>
            <li><Link to="/acquisition">New Acquisition</Link></li> */}
            <li><a onClick = {handleLogout} href='/' >Logout</a></li>
        </ul>

    );
    const guestLinks = (
        <ul>
            {/* <li><Link to='/profiles'>Renters</Link></li>
            <li><Link to="/register">Owners</Link></li>
            <li><Link to="/login">Vendors</Link></li> */}
            <li><Link to="/login">Login</Link></li>
        </ul>

    );

    let links = guestLinks

    if(isAuthenticated || (loginInProgress && getCookie('sid'))) {
      links = authLinks
    }

        
    return (
        <nav className = 'navbar bg-dark'>
            <h2><Link to='/'><i className="fas fa-code"></i> ReThink PM</Link></h2>
            {links}
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

export default connect(mapStateToProps, {logout, loadUser} )(Navbar)

