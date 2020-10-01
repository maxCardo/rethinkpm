import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../../../actions/auth'
import PropTypes from 'prop-types'
import {loadUser} from '../../../actions/auth';
import {getCookie} from '../../../util/cookies';
import generateAuthLinks from './generateAuthLinks'

const Navbar = ({auth: {isAuthenticated, loginInProgress, user}, logout}) => {
    useEffect(() => {
        loadUser();
    });
    const handleLogout = () => {
        logout()
    }
    const navigationRoutes = []
    if(user) {
      for(let role of user.roles) {
        for(let permission of role.permissions) {
          for(let navigationRoute of permission.navigationRoutes) {
            navigationRoutes.push(navigationRoute)
          }
        }
      }
    }
    console.log('Navigation routes')
    console.log(navigationRoutes)
    const authLinks = generateAuthLinks(navigationRoutes)
    
    authLinks.push(
      <a onClick={handleLogout} href='/'>
        <i className="fas fa-sign-out-alt logOutIcon"></i>
        <span>Logout</span>
      </a>
    )
    const guestLinks = [
      <Link to="/login">Login</Link>
    ]

    let links = guestLinks

    if (isAuthenticated || (loginInProgress && getCookie('sid'))) {
        links = authLinks
    }


    return (
        <nav className='navbar bg-dark'>
            <h2><Link to='/'><i className="fas fa-code"></i> ReThink PM</Link></h2>
            <ul>
              {links.map((link) => (<li>{link}</li>))}
            </ul>
        </nav>
    )
}

Navbar.propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
})

export default connect(mapStateToProps, {logout, loadUser})(Navbar)

