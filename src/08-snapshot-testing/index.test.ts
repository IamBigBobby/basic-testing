// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const input = [1, 2, 3, 4, 5];
    const expectedOutput = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            value: 4,
            next: {
              value: 5,
              next: {
                value: null,
                next: null,
              },
            },
          },
        },
      },
    };
    
    const result = generateLinkedList(input);
    expect(result).toStrictEqual(expectedOutput);
  });

  test('should generate linked list from values 2', () => {
    const input = [10, 20, 30];
    const result = generateLinkedList(input);
    
    expect(result).toMatchSnapshot();
  });
});


