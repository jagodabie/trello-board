import { render, screen } from '@testing-library/react';
import { HomePage } from './HomePage';
import userEvent from '@testing-library/user-event';

test('1# renders home page header', () => {
  render(<HomePage />);
  const headerElement = screen.getByRole('heading', {
    name: /Home Page/i,
    level: 2,
  });
  expect(headerElement).toBeInTheDocument();
});

test('2# renders home page paragraph', () => {
  render(<HomePage />);
  const paragraphElement = screen.getByText(/work in progress\./i);
  const arrowBackRoundedIcon = screen.getByTestId('ArrowBackRoundedIcon');
  expect(paragraphElement).toBeInTheDocument();
  expect(arrowBackRoundedIcon).toBeInTheDocument();
});

test('3# on page re-load appear div with opacity', () => {
  render(<HomePage />);
  const divElement = screen.getByTestId('hint-homepage-testid');
  expect(divElement).toBeInTheDocument();
  expect(divElement).toHaveStyle('opacity: 0.7');
});

test('4# click on div with opacity to disappear', async () => {
  render(<HomePage />);
  const divElement = screen.getByTestId('hint-homepage-testid');
  await userEvent.click(divElement);
  expect(divElement).not.toBeInTheDocument();
});
