import styled from 'styled-components';

interface TextareaWrapperProps {
  $transparent?: number;
}

export const TextareaWrapper = styled.div<TextareaWrapperProps>`
  border: none;
  color: #fff;
  background-color: ${(props) =>
    props?.$transparent ? 'transparent' : '#0C0F29'};
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  margin: 4px;

  textarea {
    &::placeholder {
      display: inline-block;
      font-size: 13px;
      font-weight: 600;
      margin-left: 2px;
    }
  }
`;
