import { configureStore } from '@reduxjs/toolkit';
import reducer from '../boardSlice';
import {
  createWorkspace,
  deleteWorkspace,
  setActiveWorkspace,
  updateWorkspaceName,
} from '../actions';

describe('updateWorkspaceName', () => {
  test('should update workspace name', () => {
    const store = configureStore({
      reducer,
      preloadedState: {
        workspaces: [
          {
            id: '2',
            name: 'Jira Inc.',
            tasksGroups: [],
          },
        ],
        activeItem: '',
        activeWorkspace: '2',
      },
    });

    store.dispatch(updateWorkspaceName('New workspace name'));

    const getActiveWorkspaceState = store
      .getState()
      .workspaces.find(
        (workspace) => workspace.id === store.getState().activeWorkspace
      );

    expect(getActiveWorkspaceState).toEqual({
      id: '2',
      name: 'New workspace name',
      tasksGroups: [],
    });
  });
});

describe('deleteWorkspace', () => {
  test('should delete workspace from list of workspace', async () => {
    const store = configureStore({
      reducer,
      preloadedState: {
        workspaces: [
          {
            id: '1',
            name: 'Test.',
            tasksGroups: [],
          },
          {
            id: '2',
            name: 'Jira Inc.',
            tasksGroups: [],
          },
        ],
        activeItem: '',
        activeWorkspace: '2',
      },
    });

    store.dispatch(deleteWorkspace('2'));

    expect(store.getState().workspaces.length).toBe(1);
  });
});

describe('createWorkspace', () => {
  test('should add new workspace from list of workspace', () => {
    const store = configureStore({
      reducer,
      preloadedState: {
        workspaces: [
          {
            id: '1',
            name: 'Test.',
            tasksGroups: [],
          },
          {
            id: '2',
            name: 'Jira Inc.',
            tasksGroups: [],
          },
        ],
        activeItem: '',
        activeWorkspace: '2',
      },
    });

    store.dispatch(
      createWorkspace({
        id: '3',
        name: 'New workspace',
        tasksGroups: [],
      })
    );

    expect(store.getState().workspaces.length).toBe(3);
  });

  describe('setActiveWorkspace', () => {
    test('should set active workspace', () => {
      const store = configureStore({
        reducer,
        preloadedState: {
          workspaces: [
            {
              id: '1',
              name: 'Test.',
              tasksGroups: [],
            },
            {
              id: '2',
              name: 'Jira Inc.',
              tasksGroups: [],
            },
          ],
          activeItem: '',
          activeWorkspace: '2',
        },
      });

      store.dispatch(setActiveWorkspace('1'));

      expect(store.getState().activeWorkspace).toBe('1');
    });
  });
});
