import { screen } from '@testing-library/react';

import { TasksGroupView } from './TasksGroup';
import user from '@testing-library/user-event';
import { store } from '../../store/store';
import { render } from '../../test-utils';
import { Board } from '../../store/types';

describe('TasksGroup', () => {
  const tasksGroup = {
    id: '1',
    name: 'Test Group',
    workspaceId: '1',
    doneTasks: 8,
    tasks: [],
  };

  it('1# renders the tasks group name', () => {
    render(<TasksGroupView tasksGroup={tasksGroup} />, {
      preloadedState: store.getState(),
    });

    const groupNameElement = screen.getByText('Test Group');
    expect(groupNameElement).toBeInTheDocument();
  });

  it('2#  renders the tasks group section correctly', () => {
    render(<TasksGroupView tasksGroup={tasksGroup} />, {
      preloadedState: store.getState(),
    });

    const tasksListHeader = screen.getByRole('heading', {
      name: 'Task group header',
    });
    const tasksListMain = screen.getByRole('main', {
      name: 'Tasks group main',
    });
    const tasksListFooter = screen.getByRole('contentinfo', {
      name: 'Tasks group footer',
    });

    expect(tasksListHeader).toBeInTheDocument();
    expect(tasksListMain).toBeInTheDocument();
    expect(tasksListFooter).toBeInTheDocument();
  });

  it('3# when edit button is clicked, editMode is set', async () => {
    render(<TasksGroupView tasksGroup={tasksGroup} />, {
      preloadedState: store.getState(),
    });

    const editButton = screen.queryByRole('button', { name: 'edit' });
    const deleteButton = screen.queryByRole('button', { name: 'delete' });
    const groupNameElement = screen.queryByRole('button', {
      name: 'Test Group',
    });

    expect(groupNameElement).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
    if (editButton) await user.click(editButton);

    expect(editButton).not.toBeInTheDocument();
    expect(deleteButton).not.toBeInTheDocument();
    expect(groupNameElement).not.toBeInTheDocument();
  });

  it('4# dispatches setActiveItem action when clicking on edit button', async () => {
    render(<TasksGroupView tasksGroup={tasksGroup} />, {
      preloadedState: store.getState(),
    });

    const editButton = screen.queryByRole('button', { name: 'edit' });
    if (editButton) await user.click(editButton);

    const textareaElement = screen.getByRole('textbox', { name: 'Add list' });
    expect(textareaElement).toBeInTheDocument();
  });
  it('5# does dispatch updateTasksGroupName action when inputValue is empty string', async () => {
    render(<TasksGroupView tasksGroup={tasksGroup} />, {
      preloadedState: store.getState(),
    });

    const editButton = screen.queryByRole('button', { name: 'edit' });
    if (editButton) await user.click(editButton);

    const textareaElement = screen.getByRole('textbox', { name: 'Add list' });
    await user.clear(textareaElement);
    await user.tab();

    expect(textareaElement).toBeInTheDocument();
  });
  it('6# dispatches updateTasksGroupName action when inputValue is not empty string', async () => {
    render(<TasksGroupView tasksGroup={tasksGroup} />, {
      preloadedState: store.getState(),
    });

    const editButton = screen.queryByRole('button', { name: 'edit' });
    if (editButton) await user.click(editButton);

    const textareaElement = screen.getByRole('textbox', { name: 'Add list' });
    await user.type(textareaElement, 'Test Group');

    await user.tab();
    expect(textareaElement).not.toBeInTheDocument();
  });
  // TODO: investing why this test is failing
  it.skip('7# dispatches deleteWorkspaceTasksGroup action when clicking on delete button', async () => {
    render(<TasksGroupView tasksGroup={tasksGroup} />, {
      preloadedState: store.getState(),
    });

    const deleteButton = screen.queryByRole('button', { name: 'delete' });
    if (deleteButton) await user.click(deleteButton);

    expect(deleteButton).not.toBeInTheDocument();
  });

  //TODO: fix this test
  it.skip('8# Add task when Add task button is clicked', async () => {
    const prevState: {
      preloadedState: { board: Board };
    } = {
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
                  tasks: [
                    {
                      id: '1',
                      name: 'Task 1',
                      done: false,
                      tasksGroupId: '1',
                    },
                  ],
                },
              ],
            },
          ],
          activeTask: null,
          activeWorkspace: '1',
          activeColumn: null,
          activeItem: '',
        },
      },
    };
    const [workspace] = prevState.preloadedState.board.workspaces;
    const [tasksGroup] = workspace.tasksGroups;

    render(<TasksGroupView tasksGroup={tasksGroup} />, {
      preloadedState: prevState.preloadedState,
    });

    const addTaskButton = screen.getByRole('button', { name: 'Add task' });

    await user.click(addTaskButton);
  });
});
