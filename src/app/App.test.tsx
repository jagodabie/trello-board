import { screen } from '@testing-library/react';
import { render } from '../test-utils';

import App from './App';

test('renders learn header correctly', () => {
  render(<App />);
  const linkElement = screen.getByRole('banner', {
    name: 'App Header',
  });

  expect(linkElement).toBeInTheDocument();
});
