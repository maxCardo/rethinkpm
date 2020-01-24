const creds = require('../../config/creds');

test('creds exists', () => {
    expect(creds).not.toBeNull();
});
