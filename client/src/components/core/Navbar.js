import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

const Navbar = props => {
    return (
        <nav className = 'navbar bg-dark'>
            <h1><Link to='/'><i className="fas fa-code"></i> ReThink PM</Link></h1>
            <ul>
                <li><Link to='/profiles'>Renters</Link></li>
                <li><Link to="/register">Owners</Link></li>
                <li><Link to="/login">Vendors</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul>

        </nav>
    )
}

Navbar.propTypes = {

}

export default Navbar

