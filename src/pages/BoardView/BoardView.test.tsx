import { screen } from '@testing-library/react';
import { BoardView } from './BoardView';
import { render } from '../../test-utils';
import userEvent from '@testing-library/user-event';
import { Board } from '../../store/types';
import { CustomRouter } from '../../router/CustomRouter';

describe('BoardView', () => {
  test('1# BoardView renders correctly with props in title read mode', async () => {
    const prevState: {
      preloadedState: { board: Board };
    } = {
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

  test('2# BoardView when board title element id is equal active workspace, board title is shown in edit mode', async () => {
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
  test('3# Board Main section displays correctly', () => {
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

  test('4# Board Main section displays correctly with no tasks groups', () => {
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
  test('5# Board Main section displays correctly with tasks groups', () => {
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
  test('6# Given active workspace with tasks groups then in main section displays correctly Add Next List and Task Group', () => {
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
                  workspaceId: '1',
                  name: 'Tasks Group 1',
                  tasks: [],
                },
              ],
            },
            {
              id: '2',
              name: 'Jira Inc.',
              tasksGroups: [],
            },
          ],
          activeTask: null,
          activeWorkspace: '2',
          activeItem: '2',
          activeColumn: null,
        },
      },
    };

    render(
      <CustomRouter
        components={[{ path: '/board/:id', component: <BoardView /> }]}
      />,
      {
        preloadedState: initState.preloadedState,
        path: '/board/2',
      }
    );

    const addButton = screen.getByRole('button', {
      name: 'Add new list',
    });
    const tasksGroup = screen.queryAllByRole('main', {
      name: 'Tasks group main',
    });
    expect(tasksGroup).toHaveLength(0);
    expect(addButton).toBeInTheDocument();
  });
  test('7# Given Workspace name is equal to a string and tries to lose focus, an alert should appear', async () => {
    const initState = {
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
          activeColumn: null,
        },
      },
    };

    render(
      <CustomRouter
        components={[{ path: '/board/:id', component: <BoardView /> }]}
      />,
      {
        preloadedState: initState.preloadedState,
        path: '/board/1',
      }
    );

    const textareaElement = screen.getByRole('textbox', { name: 'title' });
    expect(textareaElement).toBeInTheDocument();
    const alertMock = jest.spyOn(window, 'alert').mockImplementation();

    await userEvent.click(textareaElement);
    await userEvent.clear(textareaElement);

    await userEvent.tab();
    expect(alertMock).toHaveBeenCalledWith('Field cannot be empty!');
  });
  test('8# Given inputValue different than default one, workspace should update name', async () => {
    const initState = {
      preloadedState: {
        board: {
          workspaces: [
            {
              id: '1',
              name: 'prevName',
              tasksGroups: [],
            },
          ],
          activeTask: null,
          activeWorkspace: '1',
          activeItem: '1',
        },
      },
    };

    render(
      <CustomRouter
        components={[{ path: '/board/:id', component: <BoardView /> }]}
      />,
      {
        preloadedState: initState.preloadedState,
        path: '/board/1',
      }
    );
    const textareaElement = screen.getByRole('textbox', { name: 'title' });

    await userEvent.clear(textareaElement);

    await userEvent.type(textareaElement, 'newName');
    await userEvent.tab();
    expect(textareaElement).not.toBeInTheDocument();
  });

  test('9# Add next list when button add next list is clicked', async () => {
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
            {
              id: '2',
              name: 'Jira Inc.',
              tasksGroups: [],
            },
          ],
          activeTask: null,
          activeWorkspace: '1',
        },
      },
    };

    render(
      <CustomRouter
        components={[{ path: '/board/:id', component: <BoardView /> }]}
      />,
      {
        preloadedState: initState.preloadedState,
        path: '/board/1',
      }
    );

    const addNextListButton = screen.getByRole('button', {
      name: 'Add next list',
    });
    let tasksGroups = screen.queryAllByRole('main', {
      name: 'Tasks group main',
    });

    expect(tasksGroups).toHaveLength(1);
    expect(addNextListButton).toBeInTheDocument();

    await userEvent.click(addNextListButton);

    tasksGroups = screen.queryAllByRole('main', {
      name: 'Tasks group main',
    });
    expect(tasksGroups).toHaveLength(2);

    await userEvent.click(addNextListButton);

    tasksGroups = screen.queryAllByRole('main', {
      name: 'Tasks group main',
    });
    expect(tasksGroups).toHaveLength(3);
  });
});
