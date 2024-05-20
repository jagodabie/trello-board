export type Task = {
  tasksGroupId: string;
  name: string;
  id: string;
  done: boolean;
};
export type TasksGroup = {
  name: string;
  id: string;
  tasks: Task[];
  workspaceId: string;
  doneTasks?: number;
};

export type Workspace = {
  name: string;
  id: string;
  tasksGroups: TasksGroup[];
};
export type Board = {
  workspaces: Workspace[];
  activeWorkspace: string;
  activeColumn: TasksGroup | null;
  activeItem: string;
  activeTask: Task | null;
};

export type DndElement = Partial<Task> & Partial<TasksGroup>;
