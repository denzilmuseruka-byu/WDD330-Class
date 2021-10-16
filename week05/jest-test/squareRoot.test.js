function squareRoot(number) {
    'use strict';
    if (number < 0) {
        throw new RangeError('You can\'t find the square root of negative numbers')
    }
    return Math.sqrt(number);
};


function imaginarySquareRoot(number) {
    'use strict';
    let answer;
    try {
        answer = String(squareRoot(number));
    } catch(error) {
        answer = squareRoot(-number)+"i";
    } finally {
        return `+ or - ${answer}`;
    }
}

test('square root of 4 is 2', () => {
	expect(squareRoot(4)).toBe(2);
});

