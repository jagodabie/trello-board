import { setActiveColumn } from '../../store/slices/actions';
import { useAppDispatch } from '../useAppDispatch';

export const useHandleDragEnd = () => {
  const dispatch = useAppDispatch();

  return {
    handleDragEnd: () => {
      dispatch(setActiveColumn(''));
    },
  };
};
