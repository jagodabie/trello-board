import { screen } from '@testing-library/react';
import { render } from './test-utils';

import App from './App';
import user from '@testing-library/user-event';

test('renders learn header correctly', () => {
  render(<App />);
  const linkElement = screen.getByRole('heading', {
    name: /My Trello Board/i,
  });
  expect(linkElement).toBeInTheDocument();
});

test('renders footer correctly', () => {
  render(<App />);
  const footerElement = screen.getByText(
    /© 2024 Trello Board. All rights reserved./i
  );
  expect(footerElement).toBeInTheDocument();
});

test('opens left drawer when button is clicked', async () => {
  render(<App />);
  const buttonElement = screen.getByRole('button', { name: /Open Left/i });

  await user.click(buttonElement);
  const drawerElement = screen.getByRole('list');
  expect(drawerElement).toBeInTheDocument();
});
