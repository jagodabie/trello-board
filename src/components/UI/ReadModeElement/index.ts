import styled from 'styled-components';

interface ReadModeElementWrapperProps {
  boardElementClass?: string;
}

export const ReadModeElementWrapper = styled.div<ReadModeElementWrapperProps>`
  display: flex;
  justify-content: space-between;
  background-color: #101a21;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  width: 12rem;
  ${(props) =>
    props.boardElementClass &&
    `
    .${props.boardElementClass}-actions {
      display: flex;
      gap: 0.5rem;
    }
  `};
`;
