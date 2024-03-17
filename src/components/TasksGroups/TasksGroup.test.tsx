import { screen } from '@testing-library/react';

import { TasksGroup } from './TasksGroup';
import user from '@testing-library/user-event';
import { store } from '../../store/store';
import { render } from '../../test-utils';

describe('TasksGroup', () => {
  const tasksGroup = {
    id: '1',
    name: 'Test Group',
    workspaceId: '1',
    tasks: [],
  };

  it('renders the tasks group name', () => {
    render(<TasksGroup tasksGroup={tasksGroup} />, {
      preloadedState: store.getState(),
    });

    const groupNameElement = screen.getByText('Test Group');
    expect(groupNameElement).toBeInTheDocument();
  });

  it('renders the tasks group section correctly', () => {
    render(<TasksGroup tasksGroup={tasksGroup} />, {
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

  it('when edit button is clicked, editMode is set', async () => {
    render(<TasksGroup tasksGroup={tasksGroup} />, {
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

  it('dispatches setActiveItem action when clicking on edit button', async () => {
    render(<TasksGroup tasksGroup={tasksGroup} />, {
      preloadedState: store.getState(),
    });

    const editButton = screen.queryByRole('button', { name: 'edit' });
    if (editButton) await user.click(editButton);

    const textareaElement = screen.getByRole('textbox', { name: 'Add list' });
    expect(textareaElement).toBeInTheDocument();
  });
  it('does dispatch updateTasksGroupName action when inputValue is empty string', async () => {
    render(<TasksGroup tasksGroup={tasksGroup} />, {
      preloadedState: store.getState(),
    });

    const editButton = screen.queryByRole('button', { name: 'edit' });
    if (editButton) await user.click(editButton);

    const textareaElement = screen.getByRole('textbox', { name: 'Add list' });
    await user.clear(textareaElement);
    await user.tab();

    expect(textareaElement).toBeInTheDocument();
  });
  it('dispatches updateTasksGroupName action when inputValue is not empty string', async () => {
    render(<TasksGroup tasksGroup={tasksGroup} />, {
      preloadedState: store.getState(),
    });

    const editButton = screen.queryByRole('button', { name: 'edit' });
    if (editButton) await user.click(editButton);

    const textareaElement = screen.getByRole('textbox', { name: 'Add list' });
    await user.type(textareaElement, 'Test Group');

    await user.tab();
    expect(textareaElement).not.toBeInTheDocument();
  });
});
