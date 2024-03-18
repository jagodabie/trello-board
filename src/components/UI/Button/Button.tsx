import { StyledButton } from '.';
import { ButtonProps } from './index.type';

export const Button: React.FC<ButtonProps> = ({
  onClick,
  iconComponent,
  text,
  disabled,
  buttonClass,
}) => {
  return (
    <StyledButton
      type='button'
      text={text}
      onClick={onClick}
      disabled={disabled}
      className={buttonClass}
    >
      <span className='button-icon'>{iconComponent}</span>
      <span className='button-text'>{text}</span>
    </StyledButton>
  );
};
