import { PayloadAction } from '@reduxjs/toolkit';
import { Board, Task, TasksGroup, Workspace } from '../../types';

export const setWorkspacesOrder = (
  state: Board,
  action: PayloadAction<Workspace[]>
) => {
  state.workspaces = action.payload;
};

export const setTasksGroupOrder = (
  state: Board,
  action: PayloadAction<TasksGroupView[]>
) => {
  state.workspaces = state.workspaces.map((workspace) => {
    return workspace.id === state.activeWorkspace
      ? { ...workspace, tasksGroups: action.payload }
      : workspace;
  });
};

export const setTasks = (
  state: Board,
  action: PayloadAction<{
    tasks: Task[];
    tasksGroupId: string;
  }>
) => {
  const foundWorkspace = state.workspaces.find(
    (workspace) => workspace.id === state.activeWorkspace
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

      const updatedWorkspace: Workspace = {
        ...foundWorkspace,
        tasksGroups: updatedTasksGroups,
      };
      state.workspaces = state.workspaces.map((workspace) => {
        return workspace.id === state.activeWorkspace
          ? updatedWorkspace
          : workspace;
      });
    }
  }
};

export const createWorkspaceTasksGroup = (
  state: Board,
  action: PayloadAction<TasksGroupView>
) => {
  const workspaceFound = state.workspaces.find(
    (workspace) => workspace.id === state.activeWorkspace
  );
  if (workspaceFound) {
    const updatedWorkspace = {
      ...workspaceFound,
      tasksGroups: [...workspaceFound.tasksGroups, action.payload],
    };
    state.workspaces = [...state.workspaces].map((workspace) => {
      return workspace.id === state.activeWorkspace
        ? updatedWorkspace
        : workspace;
    });
  }
};

export const updateTasksGroupName = (
  state: Board,
  action: PayloadAction<string>
) => {
  const workspaceFound = state.workspaces.find(
    (workspace) => workspace.id === state.activeWorkspace
  );
  const tasksGroupFound = workspaceFound?.tasksGroups.find(
    (tasksGroup) => tasksGroup.id === state.activeColumn?.id
  );

  if (workspaceFound && tasksGroupFound) {
    const updatedTasksGroup = {
      ...tasksGroupFound,
      name: action.payload,
    };

    const updatedTasksGroups = workspaceFound.tasksGroups.map((tasksGroup) => {
      return tasksGroup.id === state.activeColumn?.id
        ? updatedTasksGroup
        : tasksGroup;
    });

    const updatedWorkspace = {
      ...workspaceFound,
      tasksGroups: updatedTasksGroups,
    };

    state.workspaces = [...state.workspaces].map((workspace) => {
      return workspace.id === state.activeWorkspace
        ? updatedWorkspace
        : workspace;
    });
  }
};

export const deleteWorkspaceTasksGroup = (
  state: Board,
  action: PayloadAction<string>
) => {
  const workspaceFound = state.workspaces.find(
    (workspace) => workspace.id === state.activeWorkspace
  );
  if (workspaceFound) {
    const updatedWorkspace = workspaceFound.tasksGroups.filter(
      (tasksGroup) => tasksGroup.id !== action.payload
    );
    state.workspaces = [...state.workspaces].map((workspace) => {
      return workspace.id === state.activeWorkspace
        ? { ...workspace, tasksGroups: updatedWorkspace }
        : workspace;
    });
  }
};

export const setActiveItem = (state: Board, action: PayloadAction<string>) => {
  state.activeItem = action.payload;
};
export const saveEditedWorkspace = (
  state: Board,
  action: PayloadAction<Workspace>
) => {
  state.workspaces = state.workspaces.map((workspace) => {
    return workspace.id === action.payload.id ? action.payload : workspace;
  });
};

export const setDoneTasks = (
  state: Board,
  action: PayloadAction<{ groupId: string }>
) => {
  const workspaceFound = state.workspaces.find(
    (workspace) => workspace.id === state.activeWorkspace
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
      return workspace.id === state.activeWorkspace
        ? updatedWorkspace
        : workspace;
    });
  }
};
