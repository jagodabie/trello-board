import {
  DndElementInterface,
  TaskInterface,
  TasksGroupInterface,
} from '../../store/types';
import { changedElementsOrder, getTaskPosition } from '../../utils';

interface TaskDropStrategy {
  handleTaskDrop(
    activeElement: DndElementInterface,
    overElement: DndElementInterface,
    tasksGroups?: TasksGroupInterface[]
  ): {
    updatedActiveTasksList?: {
      tasksGroupId: string;
      tasks: TaskInterface[];
    };
    updatedOverTaskList?: {
      tasksGroupId: string;
      tasks: TaskInterface[];
    };
  };
}

export class DropTaskContext {
  private taskDropStrategy: TaskDropStrategy;

  constructor(taskDropStrategy: TaskDropStrategy) {
    this.taskDropStrategy = taskDropStrategy;
  }

  public setTaskDropStrategy(taskDropStrategy: TaskDropStrategy) {
    this.taskDropStrategy = taskDropStrategy;
  }

  public getActiveElementType = (activeElement: any) => {
    return activeElement?.current?.type;
  };

  public handleTaskDrop(
    activeElement: DndElementInterface,
    overElement: DndElementInterface,
    tasksGroups?: TasksGroupInterface[]
  ) {
    return this.taskDropStrategy.handleTaskDrop(
      activeElement,
      overElement,
      tasksGroups
    );
  }
}

export class TaskDropOntoAnotherTaskDropInDifferentGroupStrategy
  implements TaskDropStrategy
{
  handleTaskDrop(
    activeElement: DndElementInterface,
    overElement: DndElementInterface,
    tasksGroups: TasksGroupInterface[]
  ): {
    updatedActiveTasksList: {
      tasksGroupId: string;
      tasks: TaskInterface[];
    };
    updatedOverTaskList: {
      tasksGroupId: string;
      tasks: TaskInterface[];
    };
  } {
    const tasksOver = tasksGroups.find(
      (group: TasksGroupInterface) => group.id === overElement.tasksGroupId
    )?.tasks;

    const indexOfOverTasks =
      tasksOver?.findIndex(
        (task: TaskInterface) => task.id === overElement.id
      ) || '';
    return {
      updatedActiveTasksList: {
        tasksGroupId: activeElement?.tasksGroupId!,
        tasks:
          tasksGroups
            .find((group) => group.id === activeElement.tasksGroupId)
            ?.tasks.filter((task: any) => task.id !== activeElement?.id) || [],
      },
      updatedOverTaskList: {
        tasksGroupId: overElement?.tasksGroupId!,
        tasks:
          ([
            ...(tasksOver?.slice(0, Number(indexOfOverTasks)) || []),
            {
              ...activeElement,
              tasksGroupId: overElement?.tasksGroupId,
            },
            ...(tasksOver?.slice(Number(indexOfOverTasks)) || []),
          ] as TaskInterface[]) || [],
      },
    };
  }
}

export class TaskDropOntoAnotherTaskDropInSameGroupStrategy
  implements TaskDropStrategy
{
  handleTaskDrop(
    activeElement: DndElementInterface,
    overElement: DndElementInterface,
    tasksGroups: TasksGroupInterface[]
  ): {
    updatedActiveTasksList: {
      tasksGroupId: string;
      tasks: TaskInterface[];
    };
  } {
    const tasksListActive =
      tasksGroups.find(
        (group: TasksGroupInterface) => group.id === activeElement.tasksGroupId
      )?.tasks || [];

    return {
      updatedActiveTasksList: {
        tasksGroupId: activeElement?.tasksGroupId!,
        tasks: changedElementsOrder(
          tasksListActive || [],
          getTaskPosition(tasksListActive, activeElement.id!),
          getTaskPosition(tasksListActive, overElement.id!)
        ),
      },
    };
  }
}

export class TaskDropOntoEmptyGroupStrategy implements TaskDropStrategy {
  handleTaskDrop(
    activeElement: DndElementInterface,
    overElement: DndElementInterface,
    tasksGroups: TasksGroupInterface[]
  ): {
    updatedActiveTasksList: {
      tasksGroupId: string;
      tasks: TaskInterface[];
    };
    updatedOverTaskList: {
      tasksGroupId: string;
      tasks: TaskInterface[];
    };
  } {
    const tasksActive = tasksGroups.find(
      (group: TasksGroupInterface) => group.id === activeElement?.tasksGroupId
    )?.tasks;

    return {
      updatedActiveTasksList: {
        tasksGroupId: activeElement?.tasksGroupId!,
        tasks:
          tasksActive?.filter(
            (task: TaskInterface) => task.id !== activeElement?.id
          ) || [],
      },
      updatedOverTaskList: {
        tasksGroupId: overElement?.id!,
        tasks: [
          {
            ...activeElement,
            tasksGroupId: overElement?.id,
          } as TaskInterface,
        ],
      },
    };
  }
}
