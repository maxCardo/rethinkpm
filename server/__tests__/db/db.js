const db = require('../../db/db');

test('db exists', () => {
    expect(db).not.toBeNull();
});

test('db is a function', () => {
    expect(typeof db).toBe('function');
});

test('db quits without an env', () => {
    const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});
    db();
    expect(mockExit).toHaveBeenCalledWith(1);
});
