// This is your function in a file named `functions.js`
function add(a, b) {
    return a + b;
}

test('this is a simple test', () => {
    expect(true).toBe(true);
});

test('adds 1 + 2 to equal 3', () => {
    expect(add(1, 2)).toBe(3);
});


module.exports = add;