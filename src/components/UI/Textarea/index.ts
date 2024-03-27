import styled from 'styled-components';

interface TextareaWrapperProps {
  $header?: number;
  $transparent?: number;
}

export const TextareaWrapper = styled.div<TextareaWrapperProps>`
  border: none;
  color: #fff;
  background-color: ${(props) =>
    props?.$transparent ? 'transparent' : '#0C0F29'};
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  max-width: ${(props) => (props?.$header ? 'none' : '14rem')};
  overflow: hidden;
  margin: 4px;

  textarea {
    &::placeholder {
      display: inline-block;
      font-size: 13px;
      font-weight: 600;
      margin-left: 2px;
    }

    &:focus {
      outline: none;
    }
  }
`;
