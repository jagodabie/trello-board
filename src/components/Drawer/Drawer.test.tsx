import { screen } from '@testing-library/react';
import { CustomDrawer } from './Drawer';
import { render } from '../../test-utils';
import userEvent from '@testing-library/user-event';

const initialState = {
  board: {
    workspaces: [
      { id: '1', name: 'Board 1', tasksGroups: [] },
      { id: '2', name: 'Board 2', tasksGroups: [] },
    ],
  },
};
describe('CustomDrawer', () => {
  test('renders correctly button to open sidebar navigation', () => {
    render(<CustomDrawer />, {
      preloadedState: initialState,
    });
    const buttonElement = screen.getByRole('button', {
      name: 'Open drawer',
    });

    expect(buttonElement).toBeInTheDocument();
  });

  test('when > button is clicked side menu opens', async () => {
    render(<CustomDrawer />, {
      preloadedState: initialState,
    });
    const buttonElement = screen.getByRole('button', {
      name: 'Open drawer',
    });
    await userEvent.click(buttonElement);
    const listElement = screen.getByRole('navigation');
    expect(listElement).toBeInTheDocument();
  });

  test('drawer closes correctly after click na background', async () => {
    render(<CustomDrawer />, {
      preloadedState: initialState,
    });

    const buttonElement = screen.getByRole('button', {
      name: 'Open drawer',
    });
    let rootDrawerElement = screen.queryByTestId('drawer-testid');
    expect(rootDrawerElement).not.toBeInTheDocument();

    await userEvent.click(buttonElement);

    rootDrawerElement = screen.getByTestId('drawer-testid');

    expect(rootDrawerElement).toBeInTheDocument();
  });
});
