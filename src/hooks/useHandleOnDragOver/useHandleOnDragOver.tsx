import { DragOverEvent } from '@dnd-kit/core';
import {
  DropTaskContext,
  TaskDropOntoAnotherTaskDropInDifferentGroupStrategy,
  TaskDropOntoAnotherTaskDropInSameGroupStrategy,
  TaskDropOntoEmptyGroupStrategy,
} from './TaskDropStrategy';
import { useAppDispatch } from '../useAppDispatch';
import { setTasks, setTasksGroupOrder } from '../../store/slices/actions';
import { changedElementsOrder, getTaskPosition } from '../../utils';

export const useHandleOnDragOver = (tasksGroups: any[]) => {
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
        const dropTaskContext = new DropTaskContext(
          new TaskDropOntoAnotherTaskDropInDifferentGroupStrategy()
        );
        const { updatedActiveTasksList, updatedOverTaskList } =
          dropTaskContext.handleTaskDrop(
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
        const dropTaskContext = new DropTaskContext(
          new TaskDropOntoAnotherTaskDropInSameGroupStrategy()
        );
        const { updatedActiveTasksList } = dropTaskContext.handleTaskDrop(
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
        const dropTaskContext = new DropTaskContext(
          new TaskDropOntoEmptyGroupStrategy()
        );

        if (overElement?.element.tasks?.length) return;

        const { updatedOverTaskList, updatedActiveTasksList } =
          dropTaskContext.handleTaskDrop(
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
