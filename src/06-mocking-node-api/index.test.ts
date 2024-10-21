import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from './';

jest.mock('fs', () => ({
  existsSync: jest.fn(),
}));

jest.mock('fs/promises', () => ({
  readFile: jest.fn(),
}));

jest.mock('path', () => ({
  join: jest.fn((...args) => args.join('/')),
}));

describe('doStuffByTimeout', () => {
  let callback: jest.Mock;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    callback = jest.fn();
  });

  test('should set timeout with provided callback and timeout', () => {
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callback, 1000);
    expect(setTimeoutSpy).toHaveBeenCalledWith(callback, 1000);
    setTimeoutSpy.mockRestore();
  });

  test('should call callback only after timeout', () => {
    doStuffByTimeout(callback, 1000);
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  let callback: jest.Mock;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    callback = jest.fn();
  });

  test('should set interval with provided callback and timeout', () => {
    const setIntervalSpy = jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, 1000);
    expect(setIntervalSpy).toHaveBeenCalledWith(callback, 1000);
    setIntervalSpy.mockRestore();
  });

  test('should call callback multiple times after multiple intervals', () => {
    doStuffByInterval(callback, 1000);
    jest.advanceTimersByTime(3000);
    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  const pathToFile = 'test.txt';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should call join with pathToFile', async () => {
    await readFileAsynchronously(pathToFile);
    expect(join).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    (existsSync as jest.Mock).mockReturnValue(false);
    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const mockContent = 'Hello, world!';
    (existsSync as jest.Mock).mockReturnValue(true);
    (readFile as jest.Mock).mockResolvedValue(Buffer.from(mockContent));

    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBe(mockContent);
  });
});
