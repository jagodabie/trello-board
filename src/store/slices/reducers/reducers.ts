import { PayloadAction } from '@reduxjs/toolkit';
import {
  BoardInterface,
  TaskInterface,
  TasksGroupInterface,
  WorkspaceInterface,
} from '../../types';

export const setWorkspacesOrder = (
  state: BoardInterface,
  action: PayloadAction<WorkspaceInterface[]>
) => {
  state.workspaces = action.payload;
};

export const setTasksGroupOrder = (
  state: BoardInterface,
  action: PayloadAction<TasksGroupInterface[]>
) => {
  state.workspaces = state.workspaces.map((workspace) => {
    return workspace.id === state.workspaceEditing
      ? { ...workspace, tasksGroups: action.payload }
      : workspace;
  });
};

export const setTasks = (
  state: BoardInterface,
  action: PayloadAction<{
    tasks: TaskInterface[];
    tasksGroupId: string;
  }>
) => {
  const foundWorkspace = state.workspaces.find(
    (workspace) => workspace.id === state.workspaceEditing
  );

  if (foundWorkspace) {
    const foundTasksGroup = foundWorkspace?.tasksGroups.find(
      (TasksGroups) => TasksGroups.id === action.payload.tasksGroupId
    );

    if (foundTasksGroup) {
      const updatedTasksGroup = {
        ...foundTasksGroup,
        tasks: action.payload.tasks,
      };

      const updatedTasksGroups = [
        ...foundWorkspace.tasksGroups.map((taskGroup) =>
          taskGroup.id === action.payload.tasksGroupId
            ? updatedTasksGroup
            : taskGroup
        ),
      ];

      const updatedWorkspace: WorkspaceInterface = {
        ...foundWorkspace,
        tasksGroups: updatedTasksGroups,
      };
      state.workspaces = state.workspaces.map((workspace) => {
        return workspace.id === state.workspaceEditing
          ? updatedWorkspace
          : workspace;
      });
    }
  }
};

export const createWorkspaceTasksGroup = (
  state: BoardInterface,
  action: PayloadAction<TasksGroupInterface>
) => {
  const workspaceFound = state.workspaces.find(
    (workspace) => workspace.id === state.workspaceEditing
  );
  if (workspaceFound) {
    const updatedWorkspace = {
      ...workspaceFound,
      tasksGroups: [...workspaceFound.tasksGroups, action.payload],
    };
    state.workspaces = [...state.workspaces].map((workspace) => {
      return workspace.id === state.workspaceEditing
        ? updatedWorkspace
        : workspace;
    });
  }
};

export const updateTasksGroupName = (
  state: BoardInterface,
  action: PayloadAction<string>
) => {
  const workspaceFound = state.workspaces.find(
    (workspace) => workspace.id === state.workspaceEditing
  );
  const tasksGroupFound = workspaceFound?.tasksGroups.find(
    (tasksGroup) => tasksGroup.id === state.itemEdited
  );

  if (workspaceFound && tasksGroupFound) {
    const updatedTasksGroup = {
      ...tasksGroupFound,
      name: action.payload,
    };

    const updatedTasksGroups = workspaceFound.tasksGroups.map((tasksGroup) => {
      return tasksGroup.id === state.itemEdited
        ? updatedTasksGroup
        : tasksGroup;
    });

    const updatedWorkspace = {
      ...workspaceFound,
      tasksGroups: updatedTasksGroups,
    };

    state.workspaces = [...state.workspaces].map((workspace) => {
      return workspace.id === state.workspaceEditing
        ? updatedWorkspace
        : workspace;
    });
  }
};

export const deleteWorkspaceTasksGroup = (
  state: BoardInterface,
  action: PayloadAction<string>
) => {
  const workspaceFound = state.workspaces.find(
    (workspace) => workspace.id === state.workspaceEditing
  );
  if (workspaceFound) {
    const updatedWorkspace = workspaceFound.tasksGroups.filter(
      (tasksGroup) => tasksGroup.id !== action.payload
    );
    state.workspaces = [...state.workspaces].map((workspace) => {
      return workspace.id === state.workspaceEditing
        ? { ...workspace, tasksGroups: updatedWorkspace }
        : workspace;
    });
  }
};

export const setItemEdited = (
  state: BoardInterface,
  action: PayloadAction<string>
) => {
  state.itemEdited = action.payload;
};
export const saveEditedWorkspace = (
  state: BoardInterface,
  action: PayloadAction<WorkspaceInterface>
) => {
  state.workspaces = state.workspaces.map((workspace) => {
    return workspace.id === action.payload.id ? action.payload : workspace;
  });
};

export const setDoneTasks = (
  state: BoardInterface,
  action: PayloadAction<{ groupId: string }>
) => {
  const workspaceFound = state.workspaces.find(
    (workspace) => workspace.id === state.workspaceEditing
  );
  const tasksGroupFound = workspaceFound?.tasksGroups.find(
    (tasksGroup) => tasksGroup.id === action.payload.groupId
  );
  if (workspaceFound && tasksGroupFound) {
    const updatedTasksGroup = {
      ...tasksGroupFound,
      doneTasks: tasksGroupFound.tasks.filter((task) => task.done).length,
    };
    const updatedTasksGroups = workspaceFound.tasksGroups.map((tasksGroup) => {
      return tasksGroup.id === action.payload.groupId
        ? updatedTasksGroup
        : tasksGroup;
    });
    const updatedWorkspace = {
      ...workspaceFound,
      tasksGroups: updatedTasksGroups,
    };

    state.workspaces = state.workspaces.map((workspace) => {
      return workspace.id === state.workspaceEditing
        ? updatedWorkspace
        : workspace;
    });
  }
};
