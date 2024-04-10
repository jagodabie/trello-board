import { SideNavigation } from './SideNavigation';
import { render } from '../../test-utils';
import { screen } from '@testing-library/react';
import user from '@testing-library/user-event';

describe('Navigation', () => {
  const mockToggleDrawer = jest.fn();

  it('should render without crashing', () => {
    render(
      <SideNavigation
        toggleDrawer={mockToggleDrawer}
        anchor='left'
        boardsList={[]}
      />
    );
    const navigationElement = screen.getByRole('presentation');
    expect(navigationElement).toBeInTheDocument();
  });

  it('should call toggleDrawer when clicked', async () => {
    render(
      <SideNavigation
        toggleDrawer={mockToggleDrawer}
        anchor='left'
        boardsList={[]}
      />
    );
    const navigationElement = screen.getByRole('presentation');
    expect(navigationElement).toBeInTheDocument();

    await user.click(navigationElement);
    expect(mockToggleDrawer).toHaveBeenCalledWith('left', false);
  });

  it('should render list items when boardsList is not empty', () => {
    render(
      <SideNavigation
        toggleDrawer={mockToggleDrawer}
        anchor='left'
        boardsList={[
          { id: '1', name: 'Board 1' },
          { id: '2', name: 'Board 2' },
        ]}
      />
    );
    const listItems = screen.getAllByRole('button');

    expect(listItems).toHaveLength(2);
  });

  it('should render "No Boards Available" when boardsList is empty', () => {
    render(
      <SideNavigation
        toggleDrawer={mockToggleDrawer}
        anchor='left'
        boardsList={[]}
      />
    );
    const listItems = screen.getByText('No Boards Available');
    expect(listItems).toBeInTheDocument();
  });
});
