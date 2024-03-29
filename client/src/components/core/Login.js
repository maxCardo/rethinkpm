import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import {login} from '../../actions/auth';
import {loadUser} from '../../actions/auth';
import BeatLoader from "react-spinners/BeatLoader";


const Login = ({login,loadUser, isAuthenticated}) => {

    useEffect(() => {
        loadUser();    
    }, [loadUser]);

    const [formData, setFormData] = useState({email:'', password:''});
    const [loading, setLoading] = useState(false)
    const {email, password}= formData;
    const onChange = async(e) => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();
        await login(email, password);
        setLoading(false)
    }
    
    //Redirect if logged in
    if (isAuthenticated) { return <Redirect to='/dash' /> }


    return (
        <div style={{padding: '1rem 2rem'}}>
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead"><i className="fas fa-user"></i> Sign Into Your Account</p>
             
            <form className="form" onSubmit = {e => onSubmit(e)}>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        autoComplete='username'
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
                        autoComplete='current-password'
                        value={password}
                        onChange={e => onChange(e)}
                        minLength="6"
                    />
                </div>
                {loading ?
                  <BeatLoader
                    size={6}
                    color={"#4285F4"}
                    loading={true}
                  />
                  :
                  <input type="submit" className="btn btn-primary" value="Login" />
                }
            </form>
            <p className="my-1">
                {/* Dont have an account? <Link className = 'btn' to="/register">Sign Up</Link> */}
            </p>
        </div>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    loadUser: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {login, loadUser})(Login)
