import { styled } from 'styled-components';
import { ButtonProps } from './index.type';

export const StyledButton = styled.button<ButtonProps>`
  /* Add your custom styles here */
  /* Example styles */
  // turn off default button styles
  border: none;
  background-color: transparent;
  cursor: pointer;
  padding: 0;
  font-weight: 400;
  line-height: 20px;
  font: inherit;
  width: 100%;
  padding: 0.5rem 0;

  color: ${({ className }) => (className ? 'background: #000420;' : '#fff')};

`;
