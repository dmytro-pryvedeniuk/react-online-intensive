import {sum, delay, getUniqueID, getFullApiUrl} from './';

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

    test('getUniqueID should return 15-characters-length string by default', () => {
        expect(getUniqueID()).toHaveLength(15);
    });

    test('getUniqueID should return string with desired length', () => {
        expect(typeof getUniqueID()).toBe('string');
        expect(getUniqueID(5)).toHaveLength(5);
        expect(getUniqueID(13)).toHaveLength(13);
    });

    test('getFullApiUrl should is a function', () => {
        expect(getFullApiUrl).toBeInstanceOf(Function);
    });

    test('getFullApiUrl should throw when first argument is not a string', () => {
        expect(() => getFullApiUrl(4, 'abc')).toThrow();
    });

    test('getFullApiUrl should throw when second argument is not a string', () => {
        expect(() => getFullApiUrl('abc', 4)).toThrow();
    });
    
    test('getFullApiUrl should return proper url', () => {
        expect(getFullApiUrl('123', 'abc')).toBe('123/abc');
        expect(getFullApiUrl('api', 'groupId')).toBe('api/groupId');
    });
})

