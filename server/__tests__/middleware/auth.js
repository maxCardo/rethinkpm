const authMiddleware = require('../../middleware/auth');

test('auth middleware exists', () => {
    expect(authMiddleware).not.toBeNull();
});

test('auth is a function', () => {
    expect(typeof authMiddleware).toEqual('function');
});

test('auth middleware will 401 without a cookie', () => {
    let sender = jest.fn();
    let statuser = jest.fn();
    let res = {
        status: (code) => {
            statuser(code);
            return {send: sender};
        },
    };
    let result = authMiddleware({cookies: {sid: null}}, res, () => {});

    expect(sender).toHaveBeenCalledWith('No Token, Auth Failed');
    expect(statuser).toHaveBeenCalledWith(401);
});

test('auth middleware will 401 if the JWT is invalid', () => {
    let jsoner = jest.fn();
    let statuser = jest.fn();
    let res = {
        status: (code) => {
            statuser(code);
            return {json: jsoner};
        },
    };

    let result = authMiddleware({cookies: {sid: 'invalid JWT'}}, res, () => {});
    expect(jsoner).toHaveBeenCalledWith({msg: 'Token is not valid'});
    expect(statuser).toHaveBeenCalledWith(401);
});
