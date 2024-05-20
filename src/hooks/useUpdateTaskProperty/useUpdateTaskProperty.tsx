import {
  setDoneTasks,
  setActiveTask,
  setTasks,
} from '../../store/slices/actions';
import { Task, TasksGroup } from '../../store/types';
import { useAppDispatch } from '../useAppDispatch';

export const useUpdateTaskProperty = (task: Task, tasksGroup: TasksGroup) => {
  const dispatch = useAppDispatch();

  const updateTaskProperty = (key: string, value: string | boolean) => {
    if (value && value !== task.name) {
      const updatedTask = {
        ...task,
        [key]: value,
      };

      dispatch(
        setTasks({
          tasks: tasksGroup.tasks.map((taskItem: Task) =>
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
