import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../../actions/auth'
import PropTypes from 'prop-types'
import {loadUser} from '../../actions/auth';
import {getCookie} from '../../util/cookies';
import AgentsIcon from './NavbarIcons/AgentsIcon';
import BuyersIcon from './NavbarIcons/BuyersIcon';
import RentersIcon from './NavbarIcons/RentersIcon';
import ServicesIcon from './NavbarIcons/ServicesIcon';
import CommunicationIcon from './NavbarIcons/CommunicationIcon';

const Navbar = ({auth: {isAuthenticated, loginInProgress}, logout}) => {
    useEffect(() => {
        loadUser();
    });
    const handleLogout = () => {
        logout()
    }
    const authLinks = (
        <ul>
            <li>
                <Link to='/profile/agentPros'>
                    <AgentsIcon />
                    <span>Agents</span>
                </Link>
            </li>
            <li>
                <Link to='/profile/buyerPros'>
                  <BuyersIcon />
                  <span>Buyers</span>
                </Link>
            </li>
            <li>
                <Link to='/profile/rentPros'>
                    <RentersIcon />
                    <span>Renters</span>
                </Link>
            </li>
            <li>
                <Link to='/services'>
                    <ServicesIcon />
                    <span>Services</span>
                </Link>
            </li>
            <li>
                <Link to='/chat'>
                  <CommunicationIcon />
                  <span>Communications</span>
                </Link>
            </li>
            <li>
                <Link to='/marketplace'>
                  <CommunicationIcon />
                  <span>Marketplace</span>
                </Link>
            </li>
            {/* <li><Link to="/rentroll">Current Rentals</Link></li>
            <li><Link to="/acquisition">New Acquisition</Link></li> */}
            <li>
                <a onClick={handleLogout} href='/'>
                    <i className="fas fa-sign-out-alt logOutIcon"></i>
                    <span>Logout</span>
                </a>
            </li>
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

    if (isAuthenticated || (loginInProgress && getCookie('sid'))) {
        links = authLinks
    }


    return (
        <nav className='navbar bg-dark'>
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
    auth: state.auth
})

export default connect(mapStateToProps, {logout, loadUser})(Navbar)

