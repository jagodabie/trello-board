import styled from 'styled-components';

export const StyledInput = styled.input`
  border: none;
  padding: 0;
  margin: 0;
  background: none;
  margin-left: 12px;

  &::placeholder {
    color: #88819f;
    display: inline-block;
    font-size: 13px;
    font-weight: 600;
    margin-left: 2px;
  }

  &:focus {
    outline: none;
  }
`;
