import styled from 'styled-components';

interface ReadModeElementWrapperProps {
  className: string;
  $header?: number;
  active?: number;
  $transparent?: number;
  $customStyles?: Record<string, string>;
}
// TODO : change style text box style changed
export const ReadModeElementWrapper = styled.div<ReadModeElementWrapperProps>`
  justify-content: space-between;
  background-color: ${({ $customStyles }) =>
    $customStyles?.backgroundColor
      ? $customStyles?.backgroundColor
      : 'transparent'};
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  display: flex;

  max-width: ${({ $customStyles }) => $customStyles?.maxWidth ?? '14rem'};
  height: ${({ $customStyles }) => $customStyles?.height ?? 'auto'};
  font-weight: ${({ $customStyles }) => $customStyles?.fontWeight ?? '400'};
  font-size: ${({ $customStyles }) => $customStyles?.fontSize ?? 'inherit'};
  line-height: 20px;
  margin: 4px;
  padding-bottom: 14px;
  border: ${({
    active,
    theme: {
      borders: { white },
    },
  }) => (active ? white : 'none')};
  box-shadow: ${({ active }) =>
    active ? '0px 0px 8px rgba(255, 255, 255, 0.5)' : 'none'};

  .${({ className }) => className}-name {
    max-width: ${({ $customStyles }) => $customStyles?.maxWidth ?? '12rem'};
    height: ${({ $customStyles }) => $customStyles?.height ?? 'auto'};
    margin-top: 2px;
    margin-left: 4px;
    word-break: break-word;
    text-align: left;
  }

  .${({ className }) => className}-actions {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }
`;
