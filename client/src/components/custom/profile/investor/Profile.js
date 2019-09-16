import React , {Fragment} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import Property from '../../assets/AssetItem'

const Profile = props => {
    return (
        <Fragment>
            <h3 className='text-primary' >Investor Profile</h3>
            <p className='lead'>
                <i className='fas fa-user' /> Welcome 
            </p>

            <div className="dash-buttons">
                <Link to="/edit-profile" className="btn btn-light"><i className="fas fa-user-circle text-primary"></i> Edit Profile</Link>
                <Link to="/add-experience" className="btn btn-light"><i className="fab fa-black-tie text-primary"></i> Add Experience</Link>
                <Link to="/add-education" className="btn btn-light"><i className="fas fa-graduation-cap text-primary"></i> Add Education</Link>
            </div>
            
            <Property/>
            
        </Fragment>
    )
}

Profile.propTypes = {

}

export default Profile
