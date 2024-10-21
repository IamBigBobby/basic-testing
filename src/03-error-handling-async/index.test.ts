// Uncomment the code below and write your tests
import { throwError, throwCustomError, resolveValue, MyAwesomeError, rejectCustomError } from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const testMessage = 'test message';
    await expect(resolveValue(testMessage)).resolves.toBe(testMessage);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const testErrorMessage = 'test error'
    expect(() => throwError(testErrorMessage)).toThrow(testErrorMessage);
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow(MyAwesomeError);
    expect(() => throwCustomError()).toThrow('This is my awesome custom error!');
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrow(MyAwesomeError);
    await expect(rejectCustomError()).rejects.toThrow('This is my awesome custom error!');
  });
});
