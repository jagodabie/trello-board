import { DragOverEvent } from '@dnd-kit/core';
import { TasksGroupInterface } from '../../store/types';
import { useAppDispatch } from '../useAppDispatch';
import { setTasks, setTasksGroupOrder } from '../../store/slices/actions';
import { changedElementsOrder, getTaskPosition } from '../../utils';

export const useHandleOnDragOver = (tasksGroups: TasksGroupInterface[]) => {
  const dispatch = useAppDispatch();
  return {
    handleOnDragOver: (event: DragOverEvent) => {
      const { active, over } = event;
      if (active?.id === over?.id) return;

      const activeElement = active?.data.current;
      const overElement = over?.data.current;
      const isOverTaskGroup = over?.data.current?.type === 'tasksGroup';
      const tasksGroupActive = tasksGroups.find(
        (taskGroup) => taskGroup.id === activeElement?.element?.tasksGroupId
      );

      if (
        activeElement?.element?.tasksGroupId !==
        overElement?.element?.tasksGroupId
      ) {
        const element = activeElement?.element;

        const newActiveTasks = tasksGroups
          .find((group) => group.id === element.tasksGroupId)
          ?.tasks.filter((task) => task.id !== active?.id);

        dispatch(
          setTasks({
            tasksGroupId: element.tasksGroupId,
            tasks: newActiveTasks || [],
          })
        );

        if (activeElement?.type === 'task') {
          if (overElement?.type === 'task') {
            // Drop task to another task
            const tasksOver = tasksGroups.find(
              (group) => group.id === overElement?.element.tasksGroupId
            )?.tasks;

            const indexOfOverTasks = tasksOver?.findIndex(
              (task) => task.id === over?.id
            );

            dispatch(
              setTasks({
                tasksGroupId: overElement?.element.tasksGroupId,
                tasks: [
                  ...(tasksOver?.slice(0, Number(indexOfOverTasks)) || []),
                  {
                    ...element,
                    tasksGroupId: overElement?.element.tasksGroupId,
                  },
                  ...(tasksOver?.slice(Number(indexOfOverTasks)) || []),
                ],
              })
            );
          }
          //   Drop task to empty tasks group
          if (isOverTaskGroup) {
            dispatch(
              setTasks({
                tasksGroupId: over?.data.current?.element?.id,
                tasks: [
                  {
                    ...element,
                    tasksGroupId: over?.data.current?.element?.id,
                  },
                ],
              })
            );
          }
        }
      } else if (
        activeElement?.type === 'task' &&
        activeElement?.element.tasksGroupId ===
          overElement?.element.tasksGroupId
      ) {
        dispatch(
          setTasks({
            tasksGroupId: activeElement?.element.tasksGroupId,
            tasks: changedElementsOrder(
              tasksGroupActive?.tasks || [],
              getTaskPosition(
                tasksGroupActive?.tasks || [],
                active.id as string
              ),
              getTaskPosition(tasksGroupActive?.tasks || [], over?.id as string)
            ),
          })
        );
      } else if (
        activeElement?.type === 'tasksGroup' &&
        overElement?.type === 'tasksGroup'
      ) {
        dispatch(
          setTasksGroupOrder(
            changedElementsOrder(
              tasksGroups,
              getTaskPosition(tasksGroups, active.id as string),
              getTaskPosition(tasksGroups, over?.id as string)
            )
          )
        );
      }
    },
  };
};
