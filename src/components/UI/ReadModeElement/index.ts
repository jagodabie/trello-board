import styled from 'styled-components';

interface ReadModeElementWrapperProps {
  boardElementClass?: string;
  header?: boolean;
}

export const ReadModeElementWrapper = styled.div<ReadModeElementWrapperProps>`
  display: flex;
  justify-content: space-between;
  background-color: #101a21;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  display: flex;
  max-width: ${(props) => (props.header ? 'none' : '12rem')};
  height: auto;
  font-weight: 400;
  line-height: 20px;
  margin: 4px;
  padding-bottom: 14px;

  ${(props: ReadModeElementWrapperProps) =>
    props.boardElementClass &&
    `
    .${props.boardElementClass}-name {
      max-width: ${(props: ReadModeElementWrapperProps) =>
        props.header ? 'none' : '9rem'};
      height: ${(props: ReadModeElementWrapperProps) =>
        props.header ? 'none' : 'auto'};
      margin-top: 2px;
      margin-left: 4px;
    }
    .${props.boardElementClass}-actions {
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }
  `};
`;
