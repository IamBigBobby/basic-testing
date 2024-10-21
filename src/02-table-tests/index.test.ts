// Uncomment the code below and write your tests
import {  simpleCalculator, Action } from './index';

/* const testCases = [
    { a: 1, b: 2, action: Action.Add, expected: 3 },
    { a: 2, b: 2, action: Action.Add, expected: 4 },
    { a: 3, b: 2, action: Action.Add, expected: 5 },
    // continue cases for other actions    
]; */

describe('simpleCalculator', () => {
  const testCases = [
    { a: 1, b: 2, action: Action.Add, expected: 3 },
    { a: 2, b: 2, action: Action.Add, expected: 4 },
    { a: 3, b: 2, action: Action.Add, expected: 5 },
    // continue cases for other actions    
  ];

  testCases.forEach(({a, b, action, expected}) => {
    test(`should return ${expected} for ${a} ${action} with ${b}`, () => {
      const result = simpleCalculator({a, b, action});
      expect(result).toBe(expected);
    })
  })
});
