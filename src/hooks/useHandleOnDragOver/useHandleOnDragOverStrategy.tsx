import { DragOverEvent } from '@dnd-kit/core';
import {
  DropContext,
  TaskDropOntoAnotherTaskDropInDifferentGroupStrategy,
  TaskDropOntoAnotherTaskDropInSameGroupStrategy,
  TaskDropOntoEmptyGroupStrategy,
} from '.';
import { useAppDispatch } from '../useAppDispatch';
import { setTasks, setTasksGroupOrder } from '../../store/slices/actions';
import { changedElementsOrder, getTaskPosition } from '../../utils';

export const useHandleOnDragOverStrategy = (tasksGroups: any[]) => {
  const dispatch = useAppDispatch();
  return {
    handleOnDragOver: (event: DragOverEvent) => {
      const { active, over } = event;
      if (active?.id === over?.id) return;
      const activeElement = {
        element: active?.data?.current?.element,
        type: active?.data?.current?.type,
      };

      const overElement = {
        element: over?.data?.current?.element,
        type: over?.data?.current?.type,
      };

      if (
        active?.data?.current?.type === over?.data?.current?.type &&
        active?.data?.current?.type === 'task' &&
        active?.data?.current?.element?.tasksGroupId !==
          over?.data?.current?.element?.tasksGroupId
      ) {
        const dropContex = new DropContext(
          new TaskDropOntoAnotherTaskDropInDifferentGroupStrategy()
        );
        const { updatedActiveTasksList, updatedOverTaskList } =
          dropContex.handleTaskDrop(
            activeElement?.element,
            overElement?.element,
            tasksGroups
          );
        dispatch(setTasks(updatedActiveTasksList!));
        dispatch(setTasks(updatedOverTaskList!));
      } else if (
        activeElement?.type === 'task' &&
        activeElement?.element?.tasksGroupId ===
          overElement?.element?.tasksGroupId
      ) {
        const dropContex = new DropContext(
          new TaskDropOntoAnotherTaskDropInSameGroupStrategy()
        );
        const { updatedActiveTasksList } = dropContex.handleTaskDrop(
          activeElement?.element,
          overElement?.element,
          tasksGroups
        );
        dispatch(setTasks(updatedActiveTasksList!));
      } else if (
        activeElement?.type === 'task' &&
        overElement?.type === 'tasksGroup' &&
        activeElement?.element?.tasksGroupId !== overElement?.element?.id
      ) {
        const dropContex = new DropContext(
          new TaskDropOntoEmptyGroupStrategy()
        );
        if (overElement?.element.tasks?.length) return;

        const { updatedOverTaskList, updatedActiveTasksList } =
          dropContex.handleTaskDrop(
            activeElement?.element,
            overElement?.element,
            tasksGroups
          );
        dispatch(setTasks(updatedActiveTasksList!));
        dispatch(setTasks(updatedOverTaskList!));
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
