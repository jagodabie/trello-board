export type TaskType = {
  tasksGroupId: string;
  name: string;
  id: string;
  done: boolean;
};
export type TasksGroupType = {
  name: string;
  id: string;
  tasks: TaskType[];
  workspaceId: string;
  doneTasks?: number;
};

export type Workspace = {
  name: string;
  id: string;
  tasksGroups: TasksGroupType[];
};
export type Board = {
  workspaces: Workspace[];
  activeWorkspace: string;
  activeColumn: TasksGroupType | null;
  activeItem: string;
  activeTask: TaskType | null;
};

export type DndElement = Partial<TaskType> & Partial<TasksGroupType>;
