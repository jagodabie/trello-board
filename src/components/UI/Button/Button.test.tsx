import { render, screen } from '@testing-library/react';
import { Button } from './Button';
import user from '@testing-library/user-event';

describe('Button', () => {
  const buttonText = 'Click me';
  const mockOnClick = jest.fn();
  test('renders button with correct text', () => {
    render(<Button text={buttonText} onClick={mockOnClick} />);
    const buttonElement = screen.getByRole('button', { name: buttonText });
    expect(buttonElement).toBeInTheDocument();
  });

  test('calls onClick handler when clicked', async () => {
    render(<Button onClick={mockOnClick} text={buttonText} />);
    const buttonElement = screen.getByRole('button', { name: buttonText });
    await user.click(buttonElement);
    expect(mockOnClick).toHaveBeenCalled();
  });

  test('renders disabled button when disabled prop is true', () => {
    render(<Button disabled onClick={mockOnClick} text={buttonText} />);
    const buttonElement = screen.getByRole('button', { name: buttonText });
    expect(buttonElement).toBeDisabled();
  });
  test('renders icon when iconComponent prop is passed', () => {
    const iconComponent = <div data-testid='icon' />;
    render(
      <Button
        onClick={mockOnClick}
        text={buttonText}
        iconComponent={iconComponent}
      />
    );
    const icon = screen.getByTestId('icon');
    expect(icon).toBeInTheDocument();
  });
  test('renders primary button when type prop is primary', () => {
    render(
      <Button onClick={mockOnClick} text={buttonText} buttonClass='primary' />
    );
    const buttonElement = screen.getByRole('button', { name: buttonText });
    expect(buttonElement).toHaveClass('primary');
  });
});
