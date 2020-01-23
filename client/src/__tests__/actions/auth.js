import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERR0R,
    LOGOUT,
} from '../../actions/type';

import {loadUser, login, logout, register} from '../../actions/auth';

jest.mock('axios');

test('All exports are functions', () => {
    expect(typeof login).toEqual('function');
    expect(typeof loadUser).toEqual('function');
    expect(typeof register).toEqual('function');
    expect(typeof logout).toEqual('function');
});

test('All functions return functions', () => {
    let LOGIN = login();
    let LOAD_USER = loadUser();
    let REGISTER = register({name: '', email: '', phone: '', password: ''});
    let LOGOUT = logout();

    expect(typeof LOGIN).toEqual('function');
    expect(typeof LOAD_USER).toEqual('function');
    expect(typeof REGISTER).toEqual('function');
    expect(typeof LOGOUT).toEqual('function');
});

test('loadUser will dispatch an error on null', async () => {
    let axios = require('axios');
    axios.__setNetworkFail(false);
    axios.__setNullResponse(true);

    let dispatch = jest.fn();
    let impl = loadUser();

    await impl(dispatch);

    expect(dispatch).toBeCalledWith({
        type: AUTH_ERR0R,
    });
});

test('loadUser will dispatch an error on network errors', async () => {
    let axios = require('axios');
    axios.__setNetworkFail(true);
    axios.__setNullResponse(false);

    let dispatch = jest.fn();
    let impl = loadUser();

    await impl(dispatch);

    expect(dispatch).toBeCalledWith({
        type: AUTH_ERR0R,
    });
});

test('login will dispatch LOGIN_SUCCESS without errors', async () => {
    //axios mock will just return the request body on a post
    let axios = require('axios');
    axios.__setNetworkFail(false);
    axios.__setNullResponse(false);
    axios.__setLoginFail(false);

    let dispatch = jest.fn();
    let impl = login('test', 'test');

    await impl(dispatch);

    expect(dispatch).toBeCalledWith({
        type: LOGIN_SUCCESS,
        payload: JSON.stringify({
            email: 'test',
            password: 'test',
        }),
    });
});

test('login will dispatch an error on network errors', async () => {
    let axios = require('axios');
    axios.__setNetworkFail(false);
    axios.__setNullResponse(false);
    axios.__setLoginFail(true);

    let dispatch = jest.fn();
    let impl = login('test', 'test');

    await impl(dispatch);

    expect(dispatch).toBeCalledWith({
        type: LOGIN_FAIL,
    });
});

test('logout will dispatch LOGOUT_SUCCESS without errors', async () => {
    let axios = require('axios');
    axios.__setNetworkFail(false);
    axios.__setNullResponse(false);
    axios.__setLoginFail(false);

    let dispatch = jest.fn();
    let impl = logout();

    await impl(dispatch);

    expect(dispatch).toBeCalledWith({
        type: LOGOUT,
    });
});

test('logout will not dispatch LOGOUT with network errors', async () => {
    let axios = require('axios');
    axios.__setNetworkFail(true);
    axios.__setNullResponse(false);
    axios.__setLoginFail(false);

    let dispatch = jest.fn();
    let impl = logout();

    await impl(dispatch);

    expect(dispatch).toHaveBeenCalledTimes(0);
});

//test('register will dispatch REGISTER_SUCCESS without errors', async () => {
//    //axios mock will just return the request body on a post
//    let axios = require('axios');
//    axios.__setNetworkFail(false);
//    axios.__setNullResponse(false);
//    axios.__setLoginFail(false);
//
//    let dispatch = jest.fn();
//    let impl = register('test', 'test', 'test', 'test');
//
//    await impl(dispatch);
//
//    expect(dispatch).toBeCalledWith({
//        type: REGISTER_SUCCESS,
//        payload: JSON.stringify({
//            name: 'test',
//            email: 'test',
//            phone: 'test',
//            password: 'test',
//        }),
//    });
//});

//test('register will dispatch an error on network errors', async () => {
//    let axios = require('axios');
//    axios.__setNetworkFail(false);
//    axios.__setNullResponse(false);
//    axios.__setLoginFail(true);
//
//    let dispatch = jest.fn();
//    let impl = register('test', 'test', 'test', 'test');
//
//    await impl(dispatch);
//
//    expect(dispatch).toBeCalledWith({
//        type: REGISTER_FAIL,
//    });
//});
