import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Input } from './Input';

describe('Input', () => {
  test('renders correctly input when placeholder, name props are given', () => {
    render(<Input placeholder='Test Placeholder' name='testName' />);
    const inputElement = screen.getByPlaceholderText('Test Placeholder');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('name', 'testName');
    expect(inputElement).toHaveAttribute('type', 'text');
  });
  test('renders correctly input when placeholder, name, type equal to number props are given', () => {
    render(
      <Input placeholder='Test Placeholder' name='testName' type='number' />
    );
    const inputElement = screen.getByPlaceholderText('Test Placeholder');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('name', 'testName');
    expect(inputElement).toHaveAttribute('type', 'number');
  });

  test('updates input value on change', async () => {
    render(<Input placeholder='Test Placeholder' name='test' type='text' />);
    const inputElement = screen.getByPlaceholderText('Test Placeholder');
    await userEvent.type(inputElement, 'go work');
    await userEvent.clear(inputElement);
    await userEvent.type(inputElement, 'work');
    expect(inputElement).toHaveValue('work');
  });
  test('calls onBlur when input loses focus', async () => {
    const onBlur = jest.fn();
    render(
      <Input
        placeholder='Test Placeholder'
        name='test'
        type='text'
        onBlur={onBlur}
      />
    );
    const inputElement = screen.getByPlaceholderText('Test Placeholder');
    await userEvent.type(inputElement, 'go work');
    inputElement.blur();
    expect(onBlur).toHaveBeenCalledWith('go work');
  });
});
