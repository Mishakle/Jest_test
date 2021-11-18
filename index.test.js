const { RedisClone } = require('./');

const TEST_KEY = 'hello';
const TEST_VALUE = 'world';
const cacheTen = new RedisClone(10);

jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');

describe('Redis clone "get" method', () => {
    cacheTen.set(TEST_KEY, TEST_VALUE);

    test('defines get() №1', () => {
        expect(cacheTen.get).toBeDefined();
    });
    
    test('defines get() №2', () => {
        expect(typeof cacheTen.get).toBe('function');
    });

    test('should return string', () => {
        expect(typeof cacheTen.get(TEST_KEY)).toBe('string');
    });

    test('should return test value', () => {
        expect(cacheTen.get(TEST_KEY)).toBe(`value is "${TEST_VALUE}"`);
    });

    test('should return test value after 1 sec timer', async () => {
        jest.advanceTimersByTime(1000);
        expect(cacheTen.get(TEST_KEY)).toBe(`value is "${TEST_VALUE}"`);
    });

    test('should NOT return test value after 11 sec timer', async () => {
        jest.advanceTimersByTime(11000);
        expect(cacheTen.get(TEST_KEY)).toBe('Such key does not exist');
    });

    // toBeFalsy undefined, null, 0, ''
});

describe('Redis clone "set" method', () => {

    test('defines set()', () => {
        expect(cacheTen.set).toBeDefined();
    });

    test('should return string that new key was created', () => {
        expect(cacheTen.set(TEST_KEY, TEST_VALUE)).toBe(`'${TEST_KEY}' key has been created`);
    });
});

describe('Redis clone "clear" method', () => {

    test('defines clear()', () => {
        expect(cacheTen.clear).toBeDefined();
    });

    test('should return null', async () => {
        expect(cacheTen.clear()).toEqual([]);
    });
});
