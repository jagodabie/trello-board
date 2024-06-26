import styled from 'styled-components';

interface TasksGroupWrapperProps {
  $height: string;
  active: number;
}
export const TasksGroupWrapper = styled.div<TasksGroupWrapperProps>`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background: ${(props) => props.theme.colors.darkblue};
  width: 14rem;
  margin: 0.2rem;
  max-height: 100%;
  height: fit-content;
  outline: ${({
    active,
    theme: {
      borders: { white },
    },
  }) => (active ? white : 'none')};
  box-shadow: ${({ active }) =>
    active ? '0px 0px 8px rgba(255, 255, 255, 0.5)' : 'none'};

  .tasks-list-header {
    box-sizing: border-box;
    width: 100%;
    margin-top: 10px;

    & > div {
      background-color: inherit;

      textarea {
        &: focus {
          outline:  ${({
            theme: {
              borders: { white },
            },
          }) => white};
          border: none;
          border-radius: 4px;
        }
       }
      }
    }

    .tasks-list-main {
      min-height: 3rem;

      height: ${(props) => `${props.$height}rem`};
      overflow: ${(props) =>
        `${Number(props.$height) > 25 ? 'auto' : 'hidden'}  `};

      scrollbar-width: thin;
      scrollbar-color: #0C0F29 transparent;
    }

    .tasks-list-footer {
      height: 2.6rem;
      box-sizing: border-box;
      margin: 6px 3px;

      &:hover {
        background: #0C0F29;
        border-radius: 8px;
      }
    }
  }
`;
