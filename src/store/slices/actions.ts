import { boardSlice } from './boardSlice';

export const {
  createWorkspace,
  deleteWorkspace,
  setItemEdited,
  saveEditedWorkspace,
  setWorkspaceEditing,
  createWorkspaceTasksGroup,
  deleteWorkspaceTasksGroup,
  updateWorkspaceName,
  updateTasksGroupName,
  setWorkspacesOrder,
  setTasksGroupOrder,
  setTasks,
  setDoneTasks,
} = boardSlice.actions;
