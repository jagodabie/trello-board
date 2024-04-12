import { screen } from '@testing-library/react';
import { render } from './test-utils';
import user from '@testing-library/user-event';

import App from './App';

test('renders learn header correctly', () => {
  render(<App />);
  const linkElement = screen.getByRole('banner', {
    name: 'App Header',
  });

  expect(linkElement).toBeInTheDocument();
});

test('renders correctly button to open sidebar navigation', () => {
  render(<App />);
  const buttonElement = screen.getByRole('button', {
    name: '>',
  });

  expect(buttonElement).toBeInTheDocument();
});

test('when > is clicked side menu  opens', async () => {
  render(<App />);
  const buttonElement = screen.getByRole('button', {
    name: '>',
  });
  await user.click(buttonElement);
  const listElement = screen.getByRole('navigation');
  expect(listElement).toBeInTheDocument();
});
