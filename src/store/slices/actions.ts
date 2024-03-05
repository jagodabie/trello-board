import { boardSlice } from './boardSlice';

export const {
  createWorkspace,
  deleteWorkspace,
  setActiveItem,
  saveEditedWorkspace,
  setActiveWorkspace,
  createWorkspaceTasksGroup,
  deleteWorkspaceTasksGroup,
  updateWorkspaceName,
  updateTasksGroupName,
  setWorkspacesOrder,
  setTasksGroupOrder,
  setTasks,
  setDoneTasks,
} = boardSlice.actions;
