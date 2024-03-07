import { logRoles, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReadModeElement } from './ReadModeElement';

describe('ReadModeElement', () => {
  test('component correctly display element name', () => {
    const view = render(
      <ReadModeElement name='Test name' boardElementClass='test-name' />
    );
    const nameElement = screen.getByRole('button', { name: 'Test name' });
    logRoles(view.container);
    expect(nameElement).toBeInTheDocument();
  });

  test('elements receive proper class', () => {
    render(
      <ReadModeElement name='Test name' boardElementClass='add-proper-value' />
    );
    const nameElement = screen.getByRole('button', { name: 'Test name' });
    expect(nameElement).toHaveClass('add-proper-value-name');
  });
  test('element witch display name receive proper class', () => {
    render(
      <ReadModeElement name='Test name' boardElementClass='add-proper-value' />
    );
    const nameElement = screen.getByRole('button', { name: 'Test name' });
    const actionsElement = screen.queryByRole('group');
    expect(actionsElement).not.toBeInTheDocument();

    expect(nameElement).toHaveClass('add-proper-value-name');
  });
  test('element actions appear when isActionVisible equal = true is given', () => {
    render(
      <ReadModeElement
        name='Test name'
        boardElementClass='add-proper-value'
        isActionVisible={true}
      />
    );
    const actionsElement = screen.getByRole('group');
    expect(actionsElement).toBeInTheDocument();
  });
  test('onEdit function is called when edit button is clicked', () => {
    const onEditMock = jest.fn();
    render(
      <ReadModeElement
        name='Test name'
        boardElementClass='add-proper-value'
        isActionVisible={true}
        onEdit={onEditMock}
      />
    );
    const editButton = screen.getByRole('button', { name: 'edit' });
    userEvent.click(editButton);
    expect(onEditMock).toHaveBeenCalled();
  });

  test('onDelete function is called when delete button is clicked', () => {
    const onDeleteMock = jest.fn();
    render(
      <ReadModeElement
        name='Test name'
        boardElementClass='add-proper-value'
        isActionVisible={true}
        onDelete={onDeleteMock}
      />
    );
    const deleteButton = screen.getByRole('button', { name: 'delete' });
    userEvent.click(deleteButton);
    expect(onDeleteMock).toHaveBeenCalled();
  });
});
