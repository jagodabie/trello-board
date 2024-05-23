import { DndElement, TaskType, TasksGroupType } from '../../store/types';
import { changedElementsOrder, getTaskPosition } from '../../utils';

interface TaskDropStrategy {
  handleTaskDrop(
    activeElement: DndElement,
    overElement: DndElement,
    tasksGroups?: TasksGroupType[]
  ): {
    updatedActiveTasksList?: {
      tasksGroupId: string;
      tasks: TaskType[];
    };
    updatedOverTaskList?: {
      tasksGroupId: string;
      tasks: TaskType[];
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
    activeElement: DndElement,
    overElement: DndElement,
    tasksGroups?: TasksGroupType[]
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
    activeElement: DndElement,
    overElement: DndElement,
    tasksGroups: TasksGroupType[]
  ): {
    updatedActiveTasksList: {
      tasksGroupId: string;
      tasks: TaskType[];
    };
    updatedOverTaskList: {
      tasksGroupId: string;
      tasks: TaskType[];
    };
  } {
    const tasksOver = tasksGroups.find(
      (group: TasksGroupType) => group.id === overElement.tasksGroupId
    )?.tasks;

    const indexOfOverTasks =
      tasksOver?.findIndex((task: TaskType) => task.id === overElement.id) ||
      '';
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
          ] as TaskType[]) || [],
      },
    };
  }
}

export class TaskDropOntoAnotherTaskDropInSameGroupStrategy
  implements TaskDropStrategy
{
  handleTaskDrop(
    activeElement: DndElement,
    overElement: DndElement,
    tasksGroups: TasksGroupType[]
  ): {
    updatedActiveTasksList: {
      tasksGroupId: string;
      tasks: TaskType[];
    };
  } {
    const tasksListActive =
      tasksGroups.find(
        (group: TasksGroupType) => group.id === activeElement.tasksGroupId
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
    activeElement: DndElement,
    overElement: DndElement,
    tasksGroups: TasksGroupType[]
  ): {
    updatedActiveTasksList: {
      tasksGroupId: string;
      tasks: TaskType[];
    };
    updatedOverTaskList: {
      tasksGroupId: string;
      tasks: TaskType[];
    };
  } {
    const tasksActive = tasksGroups.find(
      (group: TasksGroupType) => group.id === activeElement?.tasksGroupId
    )?.tasks;

    return {
      updatedActiveTasksList: {
        tasksGroupId: activeElement?.tasksGroupId!,
        tasks:
          tasksActive?.filter(
            (task: TaskType) => task.id !== activeElement?.id
          ) || [],
      },
      updatedOverTaskList: {
        tasksGroupId: overElement?.id!,
        tasks: [
          {
            ...activeElement,
            tasksGroupId: overElement?.id,
          } as TaskType,
        ],
      },
    };
  }
}
