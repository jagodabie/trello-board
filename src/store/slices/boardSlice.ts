import { createSlice } from '@reduxjs/toolkit';
import { BoardInterface } from '../types';
import * as reducers from './reducers/reducers';
import * as workspaceReducers from './reducers/workspaceReducer';

export const initialState: BoardInterface = {
  workspaces: [
    {
      id: '1',
      name: 'Trello Sp. z.o.o',
      tasksGroups: [
        {
          id: '1233',
          name: 'Tasks group 1',
          workspaceId: '1',
          doneTasks: 1,
          tasks: [
            {
              id: '21',
              name: 'Task 1',
              done: false,
              tasksGroupId: '1233',
            },
            {
              id: '22',
              name: 'Task 2',
              done: true,
              tasksGroupId: '1233',
            },
          ],
        },
        {
          id: '34545',
          name: 'TEST 1 ',
          workspaceId: '1',
          doneTasks: 1,
          tasks: [
            {
              id: '34543235',
              name: 'Task 1',
              done: false,
              tasksGroupId: '34545',
            },
            {
              id: '46545',
              name: 'Task 2',
              done: false,
              tasksGroupId: '34545',
            },
          ],
        },
      ],
    },
    {
      id: '2',
      name: 'Jira Inc.',
      tasksGroups: [],
    },
  ],
  itemEdited: '',
  workspaceEditing: '',
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    ...workspaceReducers,
    ...reducers,
  },
});

export default boardSlice.reducer;
