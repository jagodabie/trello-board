import { DragOverEvent } from '@dnd-kit/core';
import { TaskInterface, TasksGroupInterface } from '../../store/types';
import {
  setActiveColumn,
  setTasks,
  setTasksGroupOrder,
} from '../../store/slices/actions';
import { changedElementsOrder, getTaskPosition } from '../../utils';
import { useAppDispatch } from '../useAppDispatch';

export const useHandleDragEnd = (tasksGroups: TasksGroupInterface[]) => {
  const dispatch = useAppDispatch();

  return {
    handleDragEnd: (event: DragOverEvent) => {
      const { active, over } = event;

      if (active.id === over?.id) return;

      const isActiveATask = active.data.current?.type === 'task';
      const isOverATask = over?.data.current?.type === 'task';
      const columnActiveId = active?.data.current?.element?.tasksGroupId || '';
      const columnOverId = over?.data.current?.element?.tasksGroupId || '';
      const activeTask = active.data.current?.element;

      // DnD within in range  tasks group
      if (isActiveATask && isOverATask && columnOverId === columnActiveId) {
        const columnId = over?.data.current?.element.tasksGroupId || '';

        const tasksGroupActive = tasksGroups.find(
          (group: TasksGroupInterface) => group.id === columnId
        );

        dispatch(
          setTasks({
            tasksGroupId: columnId,
            tasks: changedElementsOrder(
              tasksGroupActive?.tasks || [],
              getTaskPosition(
                tasksGroupActive?.tasks || [],
                active.id as string
              ),
              getTaskPosition(tasksGroupActive?.tasks || [], over.id as string)
            ),
          })
        );
      }
      // DnD columns
      if (active.id && over?.id && !isOverATask && !isActiveATask) {
        dispatch(
          setTasksGroupOrder(
            changedElementsOrder(
              tasksGroups,
              getTaskPosition(tasksGroups, active.id as string),
              getTaskPosition(tasksGroups, over.id as string)
            )
          )
        );
      }

      if (isActiveATask && columnOverId !== columnActiveId) {
        const tasksGroupActive = tasksGroups.find(
          (group: TasksGroupInterface) => group.id === columnActiveId
        );

        const tasksGroupOver =
          tasksGroups.find(
            (group: TasksGroupInterface) => group.id === columnOverId
          )?.tasks || [];

        const newActiveTasks = tasksGroupActive?.tasks?.filter(
          (task: TaskInterface) => {
            return task.id !== activeTask.id;
          }
        );

        dispatch(
          setTasks({
            tasks: newActiveTasks ? newActiveTasks : [],
            tasksGroupId: columnActiveId
              ? columnActiveId
              : over?.data.current?.element?.id,
          })
        );

        dispatch(
          setTasks({
            tasks: [...tasksGroupOver, activeTask]
              ? [
                  ...tasksGroupOver,
                  {
                    ...activeTask,
                    tasksGroupId: columnOverId
                      ? columnOverId
                      : over?.data.current?.element?.id,
                  },
                ]
              : [],
            tasksGroupId: columnOverId
              ? columnOverId
              : over?.data.current?.element?.id,
          })
        );
      }
      dispatch(setActiveColumn(''));
    },
  };
};
