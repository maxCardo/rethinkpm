import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

const Login = props => {
    return (
        <Fragment>
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead"><i className="fas fa-user"></i> Sign Into Your Account</p>
            {/* add onsubmit to form */}
            <form className="form">
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        // value={email}
                        // onChange={e => onChange(e)}
                        required
                    />

                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        //value={password}
                        //onChange={e => onChange(e)}
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
