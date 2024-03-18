import {
  setDoneTasks,
  setActiveItem,
  setTasks,
} from '../../store/slices/actions';
import { TaskInterface, TasksGroupInterface } from '../../store/types';
import { useAppDispatch } from '../useAppDispatch';

export const useUpdateTaskProperty = (
  task: TaskInterface,
  tasksGroup: TasksGroupInterface
) => {
  const dispatch = useAppDispatch();

  const updateTaskProperty = (key: string, value: string | boolean) => {
    if (value && value !== task.name) {
      const updatedTask = {
        ...task,
        [key]: value,
      };

      dispatch(
        setTasks({
          tasks: tasksGroup.tasks.map((taskItem: TaskInterface) =>
            taskItem.id === updatedTask.id ? updatedTask : taskItem
          ),
          tasksGroupId: tasksGroup.id,
        })
      );
      if (key !== 'done') {
        dispatch(setActiveItem(''));
      }
      if (key === 'done') {
        dispatch(setDoneTasks({ groupId: tasksGroup.id }));
      }
    }
  };

  return updateTaskProperty;
};
