import { changedElementsOrder } from './index';

describe('changedElementsOrder', () => {
  test('should change the order of elements in the array', () => {
    const elements = [1, 2, 3, 4, 5];
    const originalPosition = 2;
    const newPosition = 4;

    const result = changedElementsOrder(
      elements,
      originalPosition,
      newPosition
    );

    expect(result).toEqual([1, 2, 4, 5, 3]);
  });

  test('should return the same array if originalPosition and newPosition are the same', () => {
    const elements = [1, 2, 3, 4, 5];
    const originalPosition = 2;
    const newPosition = 2;

    const result = changedElementsOrder(
      elements,
      originalPosition,
      newPosition
    );

    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  test('should return the same array if originalPosition or newPosition is out of bounds', () => {
    const elements = [1, 2, 3, 4, 5];
    const originalPosition = -1;
    const newPosition = 6;

    const result = changedElementsOrder(
      elements,
      originalPosition,
      newPosition
    );

    expect(result).toEqual([1, 2, 3, 4, 5]);
  });
});
