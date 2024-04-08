import { styled } from 'styled-components';
import { ButtonProps } from './index.type';

export const StyledButton = styled.button<ButtonProps>`
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  cursor: pointer;
  padding: 0;
  font-weight: 400;
  line-height: 20px;
  font: inherit;
  width: 100%;
  height: 100%;
  padding: 0.5rem 0;

  color: ${({ className }) =>
    className
      ? `  background: ${(props: { theme: { colors: { darkblue: string } } }) =>
          props.theme.colors.darkblue};`
      : '#fff'};
`;
