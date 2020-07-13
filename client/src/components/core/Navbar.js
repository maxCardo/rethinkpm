import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../../actions/auth'
import PropTypes from 'prop-types'
import {loadUser} from '../../actions/auth';
import {getCookie} from '../../util/cookies';
import Tooltip from './Tooltip';

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
                <Tooltip placement="top" trigger="hover" tooltip="Agents">
                    <Link to='/profile/agentPros'>
                        <i className="fas fa-user-secret"></i>
                    </Link>
                </Tooltip>
            </li>
            <li>
                <Tooltip placement="top" trigger="hover" tooltip="Buyers">

                    <Link to='/profile/buyerPros'>
                        <i className="fas fa-user-check"></i>
                    </Link>
                </Tooltip>
            </li>
            <li>
                <Tooltip placement="top" trigger="hover" tooltip="Renters">
                    <Link to='/profile/rentPros'>
                        <i className="fas fa-user-clock"></i>
                    </Link>
                </Tooltip>
            </li>
            <li>
                <Tooltip placement="top" trigger="hover" tooltip="Service">
                    <Link to='/services'>
                        <i className="fas fa-concierge-bell"></i>
                    </Link>
                </Tooltip>
            </li>
            <li>
                <Tooltip placement="top" trigger="hover" tooltip="Communication">
                    <Link to='/chat'>
                        <i className="fas fa-comments"></i>

                    </Link>
                </Tooltip>
            </li>
            {/* <li><Link to="/rentroll">Current Rentals</Link></li>
            <li><Link to="/acquisition">New Acquisition</Link></li> */}
            <li>
                <Tooltip placement="top" trigger="hover" tooltip="Logout">
                    <a onClick={handleLogout} href='/'>
                        <i className="fas fa-sign-out-alt"></i>
                    </a>
                </Tooltip>
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

