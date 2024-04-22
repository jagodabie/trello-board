import { setActiveColumn, setActiveTask } from '../../store/slices/actions';
import { useAppDispatch } from '../useAppDispatch';
import { useHandleDragEnd } from './useHandleDragEnd';
import { act, renderHook } from '@testing-library/react';

jest.mock('../useAppDispatch');
jest.mock('../../store/slices/actions');

describe('useHandleDragEnd', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should dispatch setActiveColumn and setActiveTask with null', () => {
    const dispatchMock = jest.fn();
    (useAppDispatch as jest.Mock).mockReturnValue(dispatchMock);

    const { result } = renderHook(() => useHandleDragEnd());

    act(() => {
      result.current.handleDragEnd();
    });

    expect(dispatchMock).toHaveBeenCalledTimes(2);
    expect(dispatchMock).toHaveBeenCalledWith(setActiveColumn(null));
    expect(dispatchMock).toHaveBeenCalledWith(setActiveTask(null));
  });
});
