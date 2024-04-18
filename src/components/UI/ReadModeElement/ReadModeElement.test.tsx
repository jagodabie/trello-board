import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReadModeElement } from './ReadModeElement';
import { globalTheme as theme } from './../../../styles/globalTheme';
import { render } from '../../../test-utils';

describe('ReadModeElement', () => {
  test('1# component correctly display element name', () => {
    render(<ReadModeElement name='Test name' boardElementClass='test-name' />);
    const nameElement = screen.getByRole('button', { name: 'Test name' });

    expect(nameElement).toBeInTheDocument();
  });

  test('2# elements receive proper class', () => {
    render(
      <ReadModeElement name='Test name' boardElementClass='add-proper-value' />
    );
    const nameElement = screen.getByRole('button', { name: 'Test name' });
    expect(nameElement).toHaveClass('add-proper-value-name');
  });

  test('3# when component does not receive isActionVisible then actions are not displayed', () => {
    render(
      <ReadModeElement name='Test name' boardElementClass='add-proper-value' />
    );
    const nameElement = screen.getByRole('button', { name: 'Test name' });
    const actionsElement = screen.queryByRole('group');
    expect(actionsElement).not.toBeInTheDocument();

    expect(nameElement).toHaveClass('add-proper-value-name');
  });
  test('4# element actions appear when isActionVisible equal = true is given', () => {
    render(
      <ReadModeElement
        name='Test name'
        boardElementClass='add-proper-value'
        isActionVisible={true}
      />,
      { theme }
    );
    const actionsElement = screen.getByRole('group');
    expect(actionsElement).toBeInTheDocument();
  });
  test('5# onEdit function is called when edit button is clicked', () => {
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

  test('6# onDelete function is called when delete button is clicked', () => {
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
