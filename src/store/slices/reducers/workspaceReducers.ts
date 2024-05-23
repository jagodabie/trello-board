import { PayloadAction } from '@reduxjs/toolkit';
import { Board, TaskType, TasksGroupType, Workspace } from '../../types';

export const createWorkspace = (
  state: Board,
  action: PayloadAction<Workspace>
) => {
  state.workspaces = [...state.workspaces, action.payload];
};

export const updateWorkspaceName = (
  state: Board,
  action: PayloadAction<string>
) => {
  const workspaceFound = state.workspaces.find(
    (workspace) => workspace.id === state.activeWorkspace
  );
  if (workspaceFound) {
    const updatedWorkspace = {
      ...workspaceFound,
      name: action.payload,
    };

    state.workspaces = [...state.workspaces].map((workspace) => {
      return workspace.id === state.activeWorkspace
        ? updatedWorkspace
        : workspace;
    });
  }
};

export const setActiveColumn = (
  state: Board,
  action: PayloadAction<TasksGroupType | null>
) => {
  state.activeColumn = action.payload || null;
};

export const setActiveTask = (
  state: Board,
  action: PayloadAction<TaskType | null>
) => {
  state.activeTask = action.payload;
};

export const deleteWorkspace = (
  state: Board,
  action: PayloadAction<string>
) => {
  state.workspaces = state.workspaces.filter(
    (workspace) => workspace.id !== action.payload
  );
};

export const setActiveWorkspace = (
  state: Board,
  action: PayloadAction<string>
) => {
  state.activeWorkspace = action.payload;
};
