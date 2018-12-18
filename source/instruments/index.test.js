import {sum, delay, getUniqueID} from './';

describe('Instruments:', () => {
    test('sum should be a function', () => {
        expect(sum).toBeInstanceOf(Function);
    });
    
    test('sum should throw when called with non-number as second argument', () => {
        expect(() => sum(1, 'X')).toThrow();
    });

    test('sum should throw when called with non-number as first argument', () => {
        expect(() => sum('X', 2)).toThrow();
    });

    test('sum should sum two numbers', () => {
        expect(sum(1, 2)).toBe(3);
        expect(sum(7, 10)).toMatchSnapshot();
    });

    test('delay should return a resolved promise', async () => {
        await expect(delay(2)).resolves.toBe(2);
    });

    test('getUniqueID should be a function', () => {
        expect(getUniqueID).toBeInstanceOf(Function);
    });

    test('getUniqueID should throw when called with non-number', () => {
        expect(() => getUniqueID("X")).toThrow();
    });

    test('getUniqueID should return string with desired length', () => {
        expect(typeof getUniqueID()).toBe('string');
        expect(getUniqueID(5)).toHaveLength(5);
        expect(getUniqueID(13)).toHaveLength(13);
    });
})

