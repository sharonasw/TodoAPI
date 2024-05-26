const { describe, test, expect } = require('@jest/globals');
const {getMax} = require('./Arrays.cjs');

describe('testing arrays',()=>
{
    test('should return max value in array',()=>
    {
        expect(getMax([2,3,4])).toBe(4);
    });

    test('should return undef for empty array',()=>
        {
            expect(getMax([])).toBeUndefined();
        });
});