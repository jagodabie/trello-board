import { logRoles, screen } from '@testing-library/react';

import user from '@testing-library/user-event';
import { store } from '../../store/store';
import { render } from '../../test-utils';
import { Task } from './Task';

describe('Task', () => {
  const task = {
    id: '123',
    name: 'Codding',
    tasksGroupId: '1',
    done: false,
  };

  const tasksGroup = {
    id: '1',
    name: 'Tasks group',
    workspaceId: '1',
    doneTasks: 8,
    tasks: [],
  };

  it('renders the task  name', () => {
    render(<Task task={task} tasksGroup={tasksGroup} />, {
      preloadedState: store.getState(),
    });

    const taskNameElement = screen.getByText('Codding');
    expect(taskNameElement).toBeInTheDocument();
  });

  it('when edit button is clicked, editMode is set', async () => {
    render(<Task task={task} tasksGroup={tasksGroup} />, {
      preloadedState: store.getState(),
    });

    const editButton = screen.queryByRole('button', { name: 'edit' });
    const deleteButton = screen.queryByRole('button', { name: 'delete' });
    const taskNameElement = screen.queryByRole('button', {
      name: 'Task',
    });

    expect(taskNameElement).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
    if (editButton) await user.click(editButton);

    expect(editButton).not.toBeInTheDocument();
    expect(deleteButton).not.toBeInTheDocument();
    expect(taskNameElement).not.toBeInTheDocument();
  });

  it('dispatches setActiveItem action when clicking on edit button', async () => {
    render(<Task task={task} tasksGroup={tasksGroup} />, {
      preloadedState: store.getState(),
    });

    const editButton = screen.queryByRole('button', { name: 'edit' });
    if (editButton) await user.click(editButton);

    const textareaElement = screen.getByRole('textbox', { name: 'Add task' });
    expect(textareaElement).toBeInTheDocument();
  });
  it('does dispatch updatetaskName action when inputValue is empty string', async () => {
    render(<Task task={task} tasksGroup={tasksGroup} />, {
      preloadedState: store.getState(),
    });

    const editButton = screen.queryByRole('button', { name: 'edit' });
    if (editButton) await user.click(editButton);

    const textareaElement = screen.getByRole('textbox', { name: 'Add task' });
    await user.clear(textareaElement);
    await user.tab();

    expect(textareaElement).toBeInTheDocument();
  });
  it('dispatches updateTaskName action when inputValue is not empty string', async () => {
    render(<Task task={task} tasksGroup={tasksGroup} />, {
      preloadedState: store.getState(),
    });

    const editButton = screen.queryByRole('button', { name: 'edit' });
    if (editButton) await user.click(editButton);

    const textareaElement = screen.getByRole('textbox', { name: 'Add task' });
    await user.type(textareaElement, 'Test Task');

    await user.tab();
    expect(textareaElement).not.toBeInTheDocument();
  });
});
