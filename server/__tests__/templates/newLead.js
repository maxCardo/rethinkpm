let newLead = require('../../templets/newLead.js');

test('newLead exists', () => {
    expect(newLead).not.toBeNull();
});

test('newLead.firstContact is a function', () => {
    expect(typeof newLead.firstContact).toEqual('function');
});

test('newLead.firstContact returns a string', () => {
    expect(typeof newLead.firstContact('test', 'test')).toEqual('string');
});
