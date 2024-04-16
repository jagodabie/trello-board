import { screen } from '@testing-library/react';
import { BoardView } from './BoardView';
import { render } from '../../test-utils';
import userEvent from '@testing-library/user-event';

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
          activeTask: null,
          activeWorkspace: '1',
          activeColumn: null,
          activeItem: '',
        },
      },
    };

    render(<BoardView />, {
      preloadedState: prevState.preloadedState,
    });

    const headerElement = screen.getByRole('header', {
      name: 'Board header',
    });
    expect(headerElement).toBeInTheDocument();
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
          activeTask: {
            id: '1',
            name: 'Trello Sp. z.o.o',
            tasksGroupId: '1',
            done: false,
          },
          activeWorkspace: '1',
        },
      },
    };

    render(<BoardView />, { preloadedState: prevState.preloadedState });

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
                  tasks: [],
                },
                {
                  id: '2',
                  name: 'Tasks Group 2',
                  tasks: [],
                },
              ],
            },
          ],
          activeTask: null,
          activeWorkspace: '1',
        },
      },
    };
    render(<BoardView />, { preloadedState: prevState.preloadedState });
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
          activeTask: null,
          activeWorkspace: '1',
        },
      },
    };
    render(<BoardView />, {
      preloadedState: prevState.preloadedState,
    });
    const mainElement = screen.getByRole('main', { name: 'Board main' });
    const addButton = screen.getByRole('button', {
      name: 'Add new list',
    });

    expect(mainElement).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
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
                  tasks: [],
                },
                {
                  id: '2',
                  name: 'Tasks Group 2',
                  tasks: [],
                },
              ],
            },
          ],
          activeTask: null,
          activeWorkspace: '1',
        },
      },
    };
    render(<BoardView />, { preloadedState: prevState.preloadedState });
    const mainElement = screen.getByRole('main', { name: 'Board main' });
    expect(mainElement).toBeInTheDocument();
  });
  test('Given active workspace with tasks groups then in main section displays correctly Add Next List and Task Group', () => {
    const initState = {
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
                  tasks: [],
                },
              ],
            },
          ],
          activeTask: null,
          activeWorkspace: '1',
        },
      },
    };

    render(<BoardView />, {
      preloadedState: initState.preloadedState,
      path: '/board/1',
    });
    const addButton = screen.getByRole('button', {
      name: 'Add next list',
    });
    const tasksGroup = screen.getAllByRole('main', {
      name: 'Tasks group main',
    });
    expect(tasksGroup).toHaveLength(1);
    expect(addButton).toBeInTheDocument();
  });
  test.skip('Given Workspace name is equal to a string and tries to lose focus, an alert should appear', async () => {
    // TODO: fix test
    const prevState = {
      preloadedState: {
        board: {
          workspaces: [
            {
              id: '1',
              name: 'WWW',
              tasksGroups: [],
            },
          ],
          activeTask: null,
          activeWorkspace: '1',
          activeItem: '1',
        },
      },
    };
    render(<BoardView />, {
      preloadedState: prevState.preloadedState,
      path: '/board/1',
    });
    const textareaElement = screen.getByRole('textbox', { name: 'title' });
    expect(textareaElement).toBeInTheDocument();
    await userEvent.click(textareaElement);
    await userEvent.clear(textareaElement);

    await userEvent.tab();
  });
});
