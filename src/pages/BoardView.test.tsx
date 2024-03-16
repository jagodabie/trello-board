import { screen } from '@testing-library/react';
import { BoardView } from './BoardView';
import { render } from '../test-utils';
import { updateWorkspaceName } from '../store/slices/actions';
import reducer from '../store/slices/boardSlice';

describe('BoardView', () => {
  test('BoardView renders correctly with props in title read mode', async () => {
    const prevState = {
      preloadedState: {
        board: {
          workspaces: [
            {
              id: '1',
              name: 'Trello Sp. z.o.o',
              tasksGroups: [],
            },
            {
              id: '2',
              name: 'Jira Inc.',
              tasksGroups: [],
            },
          ],
          activeItem: '',
          activeWorkspace: '1',
        },
      },
    };

    render(<BoardView id='1' />, { preloadedState: prevState.preloadedState });

    const editButton = screen.getByRole('header', { name: 'Board header' });
    expect(editButton).toBeInTheDocument();
    expect(
      reducer(prevState.preloadedState.board, updateWorkspaceName('Name new'))
    ).toEqual({
      workspaces: [
        {
          id: '1',
          name: 'Name new',
          tasksGroups: [],
        },
        {
          id: '2',
          name: 'Jira Inc.',
          tasksGroups: [],
        },
      ],
      activeItem: '',
      activeWorkspace: '1',
    });
  });
  test('BoardView when board title element id is equal active workspace, board title is shown in edit mode', async () => {
    const prevState = {
      preloadedState: {
        board: {
          workspaces: [
            {
              id: '1',
              name: 'Trello Sp. z.o.o',
              tasksGroups: [],
            },
            {
              id: '2',
              name: 'Jira Inc.',
              tasksGroups: [],
            },
          ],
          activeItem: '1',
          activeWorkspace: '1',
        },
      },
    };

    render(<BoardView id='1' />, { preloadedState: prevState.preloadedState });

    const input = screen.getByRole('textbox', { name: 'title' });
    expect(input).toBeInTheDocument();
  });
  test('Board Main section displays correctly', () => {
    const prevState = {
      preloadedState: {
        board: {
          workspaces: [
            {
              id: '1',
              name: 'Trello Sp. z.o.o',
              tasksGroups: [
                {
                  id: '1',
                  name: 'Tasks Group 1',
                },
                {
                  id: '2',
                  name: 'Tasks Group 2',
                },
              ],
            },
          ],
          activeItem: '',
          activeWorkspace: '1',
        },
      },
    };
    render(<BoardView id='1' />, { preloadedState: prevState.preloadedState });
    const mainElement = screen.getByRole('main', { name: 'Board main' });
    expect(mainElement).toBeInTheDocument();
  });

  test('Board Main section displays correctly with no tasks groups', () => {
    const prevState = {
      preloadedState: {
        board: {
          workspaces: [
            {
              id: '1',
              name: 'Trello Sp. z.o.o',
              tasksGroups: [],
            },
          ],
          activeItem: '',
          activeWorkspace: '1',
        },
      },
    };
    render(<BoardView id='1' />, { preloadedState: prevState.preloadedState });
    const mainElement = screen.getByRole('main', { name: 'Board main' });
    const paragraphElement = screen.getByText('No tasks groups');

    expect(mainElement).toBeInTheDocument();
    expect(paragraphElement).toBeInTheDocument();
  });
  test('Board Main section displays correctly with tasks groups', () => {
    const prevState = {
      preloadedState: {
        board: {
          workspaces: [
            {
              id: '1',
              name: 'Trello Sp. z.o.o',
              tasksGroups: [
                {
                  id: '1',
                  name: 'Tasks Group 1',
                },
                {
                  id: '2',
                  name: 'Tasks Group 2',
                },
              ],
            },
          ],
          activeItem: '',
          activeWorkspace: '1',
        },
      },
    };
    render(<BoardView id='1' />, { preloadedState: prevState.preloadedState });
    const mainElement = screen.getByRole('main', { name: 'Board main' });
    expect(mainElement).toBeInTheDocument();
  });
});
