import React, {Fragment, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
//import PropTypes from 'prop-types'
import { login } from '../../actions/auth';

const Login = props => {

    const [formData, setFormData] = useState({email:'', password:''});
    const {email, password}= formData;
    const onChange = async(e) => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log('hitting btn');
        const body = JSON.stringify({email, password});
        const config = {headers: {'Content-Type': 'application/json'}};
        try {
            const res = await axios.post('/api/users/login', body, config);
            console.log(res);
        } catch (err) {
            console.log('not working:', err  );
        }
    }
    
    return (
        <Fragment>
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead"><i className="fas fa-user"></i> Sign Into Your Account</p>
             
            <form className="form" onSubmit = {e => onSubmit(e)}>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={email}
                        onChange={e => onChange(e)}
                        required
                    />

                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={e => onChange(e)}
                        minLength="6"
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Login" />
            </form>
            <p className="my-1">
                Dont have an account? <Link className = 'btn' to="/register">Sign Up</Link>
            </p>
        </Fragment>
    )
}

Login.propTypes = {

}

export default Login
