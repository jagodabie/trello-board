import styled from 'styled-components';

interface TextareaWrapperProps {
  header?: boolean;
}

export const TextareaWrapper = styled.div<TextareaWrapperProps>`
  border: none;
  color: #fff;
  background-color: #101a21;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  max-width: ${(props) => (props.header ? 'none' : '12rem')};
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