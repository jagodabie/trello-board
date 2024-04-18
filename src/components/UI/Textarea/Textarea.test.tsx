import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Textarea } from './Textarea';

describe('textarea', () => {
  test('1# renders correctly textarea when placeholder, name props are given', () => {
    render(
      <Textarea
        placeholder='Test Placeholder'
        name='testName'
        ariaLabel='title'
      />
    );
    const textareaElement = screen.getByPlaceholderText('Test Placeholder');
    expect(textareaElement).toBeInTheDocument();
  });

  test('2# updates textarea value on change', async () => {
    render(
      <Textarea placeholder='Test Placeholder' name='test' ariaLabel='title' />
    );
    const textareaElement = screen.getByPlaceholderText('Test Placeholder');
    await userEvent.type(textareaElement, 'go work');
    await userEvent.clear(textareaElement);
    await userEvent.type(textareaElement, 'work');
    expect(textareaElement).toHaveValue('work');
  });
  test('3# calls onBlur when textarea loses focus', async () => {
    const onBlur = jest.fn();
    render(
      <Textarea
        placeholder='Test Placeholder'
        name='test'
        onBlur={onBlur}
        ariaLabel='title'
      />
    );
    const textareaElement = screen.getByPlaceholderText('Test Placeholder');
    await userEvent.type(textareaElement, 'go work');
    textareaElement.blur();
    expect(onBlur).toHaveBeenCalledWith('go work');
  });
  test('4# renders proper styles with custom styles are given', () => {
    render(
      <Textarea
        placeholder='Test Placeholder'
        name='test'
        ariaLabel='title'
        customStyle={{
          maxWidth: '100%',
          backgroundColor: 'transparent',
          fontWeight: '1000',
          fontSize: '25px',
        }}
      />
    );
    const textareaElement = screen.getByPlaceholderText('Test Placeholder');
    expect(textareaElement).toHaveStyle({
      maxWidth: '100%',
      backgroundColor: 'transparent',
      fontWeight: '1000',
      fontSize: '25px',
    });
  });
  test('5# renders proper styles with custom styles are not given', () => {
    render(
      <Textarea placeholder='Test Placeholder' name='test' ariaLabel='title' />
    );
    const textareaElement = screen.getByPlaceholderText('Test Placeholder');
    expect(textareaElement).toHaveStyle({
      color: 'inherit',
      resize: 'none',
      backgroundColor: 'inherit',
      width: '100%',
      fontSize: '15px',
      maxWidth: '14rem',
    });
  });

  test('6# onBlur props is not given then onBlur is not called', async () => {
    const onBlur = jest.fn();
    render(
      <Textarea placeholder='Test Placeholder' name='test' ariaLabel='title' />
    );
    const textareaElement = screen.getByPlaceholderText('Test Placeholder');
    await userEvent.type(textareaElement, 'go work');
    textareaElement.blur();
    expect(onBlur).not.toHaveBeenCalled();
  });
});
