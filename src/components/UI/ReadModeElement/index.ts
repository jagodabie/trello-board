import styled from 'styled-components';

interface ReadModeElementWrapperProps {
  className: string;
  $header?: number;
  active?: number;
  $transparent?: number;
}

export const ReadModeElementWrapper = styled.div<ReadModeElementWrapperProps>`
  justify-content: space-between;
  background-color: ${(props) =>
    props?.$transparent ? 'transparent' : '#0C0F29'};
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
  border: ${({ active }) => (active ? 'solid 1px #fff' : 'none')};
  box-shadow: ${({ active }) =>
    active ? '0px 0px 8px rgba(255, 255, 255, 0.5)' : 'none'};

  .${(props) => props.className}-name {
    max-width: ${(props: ReadModeElementWrapperProps) =>
      props.$header ? 'none' : '12rem'};
    height: ${(props: ReadModeElementWrapperProps) =>
      props.$header ? 'none' : 'auto'};
    margin-top: 2px;
    margin-left: 4px;
    word-break: break-word;
    text-align: left;
  }

  .${(props) => props.className}-actions {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }
`;
