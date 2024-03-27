import { PayloadAction } from '@reduxjs/toolkit';
import { BoardInterface, WorkspaceInterface } from '../../types';

export const createWorkspace = (
  state: BoardInterface,
  action: PayloadAction<WorkspaceInterface>
) => {
  state.workspaces = [...state.workspaces, action.payload];
};

export const updateWorkspaceName = (
  state: BoardInterface,
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
  state: BoardInterface,
  action: PayloadAction<string>
) => {
  state.activeColumn = action.payload;
};

export const setActiveTask = (
  state: BoardInterface,
  action: PayloadAction<string>
) => {
  state.activeColumn = action.payload;
};
export const deleteWorkspace = (
  state: BoardInterface,
  action: PayloadAction<string>
) => {
  state.workspaces = state.workspaces.filter(
    (workspace) => workspace.id !== action.payload
  );
};

export const setActiveWorkspace = (
  state: BoardInterface,
  action: PayloadAction<string>
) => {
  state.activeWorkspace = action.payload;
};
