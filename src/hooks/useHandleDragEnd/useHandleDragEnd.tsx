import { DragOverEvent } from '@dnd-kit/core';
import { TaskInterface, TasksGroupInterface } from '../../store/types';
import { setTasks, setTasksGroupOrder } from '../../store/slices/actions';
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
      // DnD between columns
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
      if (isActiveATask && isOverATask && columnOverId !== columnActiveId) {
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
            tasks: newActiveTasks?.length ? newActiveTasks : [],
            tasksGroupId: columnActiveId,
          })
        );

        dispatch(
          setTasks({
            tasks: [...tasksGroupOver, activeTask]?.length
              ? [...tasksGroupOver, activeTask]
              : [],
            tasksGroupId: columnOverId,
          })
        );
      }
    },
  };
};
