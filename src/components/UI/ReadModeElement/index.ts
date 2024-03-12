import styled from 'styled-components';

interface ReadModeElementWrapperProps {
  className?: string;
  $header?: number;
}

export const ReadModeElementWrapper = styled.div<ReadModeElementWrapperProps>`
  justify-content: space-between;
  background-color: #002e4e;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  display: flex;
  max-width: ${(props) => (props.$header ? 'none' : '14rem')};
  height: auto;
  font-weight: 400;
  line-height: 20px;
  margin: 4px;
  padding-bottom: 14px;

  ${(props: ReadModeElementWrapperProps) =>
    props.className &&
    `
    .${props.className}-name {
      max-width: ${(props: ReadModeElementWrapperProps) =>
        props.$header ? 'none' : '12rem'};
      height: ${(props: ReadModeElementWrapperProps) =>
        props.$header ? 'none' : 'auto'};
      margin-top: 2px;
      margin-left: 4px;
    }
    .${props.className}-actions {
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }
  `};
`;
