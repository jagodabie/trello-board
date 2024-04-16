import { SideNavigation } from './SideNavigation';
import { render } from '../../test-utils';
import { screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import userEvent from '@testing-library/user-event';

describe('Navigation', () => {
  const mockToggleDrawer = jest.fn();

  it('should render without crashing', () => {
    render(
      <SideNavigation toggleDrawer={mockToggleDrawer} anchor='left' id='1' />
    );
    const navigationElement = screen.getByRole('presentation');
    expect(navigationElement).toBeInTheDocument();
  });

  it('should call toggleDrawer when clicked', async () => {
    render(
      <SideNavigation id='1' toggleDrawer={mockToggleDrawer} anchor='left' />
    );
    const navigationElement = screen.getByRole('presentation');
    expect(navigationElement).toBeInTheDocument();

    await user.click(navigationElement);
    expect(mockToggleDrawer).toHaveBeenCalledWith('left', false);
  });

  it('should render list items  and add button when boardsList is not empty', () => {
    render(
      <SideNavigation toggleDrawer={mockToggleDrawer} anchor='left' id='1' />
    );
    const listItems = screen.getAllByRole('listitem');
    const addButton = screen.getByRole('button', { name: 'Add Workspace' });
    const navigationElementHeader = screen.getByRole('heading', {
      name: 'My boards',
    });
    expect(navigationElementHeader).toBeInTheDocument();
    expect(listItems).toHaveLength(2);
    expect(addButton).toBeInTheDocument();
  });

  it('should render only Add Workspace button when workspaces are not created yet', () => {
    const mockStore = {
      board: {
        workspaces: [],
      },
    };
    render(
      <SideNavigation toggleDrawer={mockToggleDrawer} anchor='left' id='1' />,
      {
        preloadedState: mockStore,
      }
    );
    const addButton = screen.getByRole('button', { name: 'Add Workspace' });
    const navigationElementHeader = screen.queryByRole('heading', {
      name: 'My boards',
    });

    expect(addButton).toBeInTheDocument();
    expect(navigationElementHeader).not.toBeInTheDocument();
  });

  it('should dispatch createWorkspace and navigate when Add Workspace button is clicked', async () => {
    const mockStore = {
      board: {
        workspaces: [
          { id: '1', name: 'Board 1', tasksGroups: [] },
          { id: '2', name: 'Board 2', tasksGroups: [] },
        ],
      },
    };

    render(
      <SideNavigation toggleDrawer={mockToggleDrawer} anchor='left' id='1' />,
      {
        preloadedState: mockStore,
      }
    );

    const addButton = screen.getByRole('button', { name: 'Add Workspace' });
    let listItems = screen.getAllByRole('listitem');

    expect(listItems).toHaveLength(2);

    await userEvent.click(addButton);

    listItems = screen.getAllByRole('listitem');

    expect(listItems).toHaveLength(3);
  });
});
