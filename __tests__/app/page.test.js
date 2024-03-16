const addFunction = require('../app/functions.test.js');

test('adds 1 + 2 to equal 3', () => {
    expect(addFunction(1, 2)).toBe(3);
});