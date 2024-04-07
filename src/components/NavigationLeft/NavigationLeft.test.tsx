import { Navigation } from './NavigationLeft';
import { render } from '../../test-utils';
import { screen } from '@testing-library/react';
import user from '@testing-library/user-event';

describe('Navigation', () => {
  const mockToggleDrawer = jest.fn();

  it('should render without crashing', () => {
    render(
      <Navigation
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
      <Navigation
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
      <Navigation
        toggleDrawer={mockToggleDrawer}
        anchor='left'
        boardsList={['Board 1', 'Board 2']}
      />
    );
    const listItems = screen.getAllByRole('button');

    expect(listItems).toHaveLength(2);
  });

  it('should render "No Boards Available" when boardsList is empty', () => {
    render(
      <Navigation
        toggleDrawer={mockToggleDrawer}
        anchor='left'
        boardsList={[]}
      />
    );
    const listItems = screen.getByText('No Boards Available');
    expect(listItems).toBeInTheDocument();
  });
});
