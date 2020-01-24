const axios = jest.genMockFromModule('axios');
var networkFail = false;
var nullResponse = false;
var postLoginFail = false;

axios.__setNetworkFail = (bool) => {
    networkFail = bool;
};
axios.__setNullResponse = (bool) => {
    nullResponse = bool;
};
axios.__setLoginFail = (bool) => {
    postLoginFail = bool;
};

axios.get = (path) => {
    if (networkFail) return Promise.reject(new Error('Network fail'));
    if (nullResponse) return Promise.resolve({data: null});
    switch (path) {
        case '/api/users':
            return Promise.resolve({
                data: {
                    testData: 'test',
                },
            });
    }
};

axios.post = (path, body, config) => {
    if (networkFail) return Promise.reject(new Error('Network fail'));
    if (nullResponse) return Promise.resolve({data: null});
    if (postLoginFail)
        return Promise.reject({response: {data: {error: 'Login fail'}}});
    switch (path) {
        case '/api/users/login':
            return Promise.resolve({
                data: body,
            });
        case 'api/users/logout':
            return Promise.resolve();
    }
};

module.exports = axios;
