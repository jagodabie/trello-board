import boardSlice, { initialState } from './boardSlice';

describe('tests for boardSlice', () => {
  test('initialize slice with initialValue', () => {
    const boardSliceInit = boardSlice(initialState, { type: 'unknown' });
    expect(boardSliceInit).toBe(initialState);
  });
});
