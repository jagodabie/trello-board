import {
  setDoneTasks,
  setActiveTask,
  setTasks,
} from '../../store/slices/actions';
import { TaskType, TasksGroupType } from '../../store/types';
import { useAppDispatch } from '../useAppDispatch';

export const useUpdateTaskProperty = (
  task: TaskType,
  tasksGroup: TasksGroupType
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
          tasks: tasksGroup.tasks.map((taskItem: TaskType) =>
            taskItem.id === updatedTask.id ? updatedTask : taskItem
          ),
          tasksGroupId: tasksGroup.id,
        })
      );
      if (key !== 'done') {
        dispatch(setActiveTask(null));
      }
      if (key === 'done') {
        dispatch(setDoneTasks({ groupId: tasksGroup.id }));
      }
    }
  };

  return updateTaskProperty;
};
