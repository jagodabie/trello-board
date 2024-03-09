import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Textarea } from './Textarea';

describe('textarea', () => {
  test('renders correctly textarea when placeholder, name props are given', () => {
    render(<Textarea placeholder='Test Placeholder' name='testName' />);
    const textareaElement = screen.getByPlaceholderText('Test Placeholder');
    expect(textareaElement).toBeInTheDocument();
  });

  test('updates textarea value on change', async () => {
    render(<Textarea placeholder='Test Placeholder' name='test' />);
    const textareaElement = screen.getByPlaceholderText('Test Placeholder');
    await userEvent.type(textareaElement, 'go work');
    await userEvent.clear(textareaElement);
    await userEvent.type(textareaElement, 'work');
    expect(textareaElement).toHaveValue('work');
  });
  // TODO: fix test for onBlur
  test.skip('calls onBlur when textarea loses focus', async () => {
    const onBlur = jest.fn();
    render(
      <Textarea placeholder='Test Placeholder' name='test' onBlur={onBlur} />
    );
    const textareaElement = screen.getByPlaceholderText('Test Placeholder');
    await userEvent.type(textareaElement, 'go work');
    textareaElement.blur();
    expect(onBlur).toHaveBeenCalledWith('go work');
  });
  test('rerenders proper style when header prop is given', () => {
    render(<Textarea placeholder='Test Placeholder' name='test' header />);
    const textareaElement = screen.getByPlaceholderText('Test Placeholder');
    expect(textareaElement).toHaveStyle({
      maxWidth: 'none',
    });
    test('rerenders proper style when header prop is not given', () => {
      render(<Textarea placeholder='Test Placeholder' name='test' />);
      const textareaElement = screen.getByPlaceholderText('Test Placeholder');
      expect(textareaElement).toHaveStyle({
        maxWidth: '9rem',
      });
    });
  });
});
