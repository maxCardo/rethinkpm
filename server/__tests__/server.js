const request = require('supertest');
const server = require('../server');

test('server creates an app', () => {
    expect(server).not.toBeNull();
});
