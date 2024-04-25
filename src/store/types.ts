export interface TaskInterface {
  tasksGroupId: string;
  name: string;
  id: string;
  done: boolean;
}
export interface TasksGroupInterface {
  name: string;
  id: string;
  tasks: TaskInterface[];
  workspaceId: string;
  doneTasks?: number;
}

export interface WorkspaceInterface {
  name: string;
  id: string;
  tasksGroups: TasksGroupInterface[];
}
export interface BoardInterface {
  workspaces: WorkspaceInterface[];
  activeWorkspace: string;
  activeColumn: TasksGroupInterface | null;
  activeItem: string;
  activeTask: TaskInterface | null;
}

export interface DndElementInterface
  extends TaskInterface,
    TasksGroupInterface {}

export interface DnDElement {
  element: DndElementInterface;
  type: string;
}
