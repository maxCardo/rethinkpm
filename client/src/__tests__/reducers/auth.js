import auth from '../../reducers/auth';
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED,
    AUTH_ERR0R,
    LOGOUT,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
} from '../../actions/type';

test('reducer exists', () => {
    expect(typeof auth).toEqual('function');
});

test('Null type does not change state', () => {
    let result = auth({hello: 'world'}, {type: null});
    expect(result).toEqual({hello: 'world'});
});

test('USER_LOADED adds user data', () => {
    let result = auth({user: null}, {type: USER_LOADED, payload: 'tomato'});
    expect(result).toEqual({
        user: 'tomato',
        isAuthenticated: true,
        loading: false,
    });
});

test('REGISTER_SUCCESS merges the state with the payload', () => {
    let result = auth(
        {hello: 'world'},
        {type: REGISTER_SUCCESS, payload: {tomato: 'tomaato'}}
    );
    expect(result).toHaveProperty('hello');
    expect(result).toHaveProperty('tomato');
});

test('LOGOUT sets authenticated to false', () => {
    let result = auth({isAuthenticated: true}, {type: LOGOUT});
    expect(result.isAuthenticated).toEqual(false);
});

test('LOGOUT sets loading to false', () => {
    let result = auth({loading: true}, {type: LOGOUT});
    expect(result.loading).toEqual(false);
});

test('LOGOUT does not modify other state', () => {
    let result = auth({hello: 'world'}, {type: LOGOUT});
    expect(result.hello).toEqual('world');
});

test('LOGIN_SUCCESS does nothing', () => {
    let result = auth(15, {type: LOGIN_SUCCESS});
    expect(result).toEqual(15);
});

test('LOGIN_FAIL does nothing', () => {
    let result = auth('cantalope', {type: LOGIN_FAIL});
    expect(result).toEqual('cantalope');
});

test('REGISTER_FAIL does nothing', () => {
    let result = auth(true, {type: REGISTER_FAIL});
    expect(result).toEqual(true);
});

test('AUTH_ERR0R does nothing', () => {
    let result = auth({state: 'standin'}, {type: AUTH_ERR0R});
    expect(result).toEqual({state: 'standin'});
});
