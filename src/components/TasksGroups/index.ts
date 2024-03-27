import styled from 'styled-components';

interface TasksGroupWrapperProps {
  $height: string;
  active: number;
}
export const TasksGroupWrapper = styled.div<TasksGroupWrapperProps>`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background: #000420;
  width: 14rem;
  margin: 0.2rem;
  max-height: 100%;
  height: fit-content;
  outline: ${({ active }) => (active ? 'solid 1px #fff' : 'none')};
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
          outline: solid 1px;
          border: none;
          border-radius: 4px;
        }
       }
      }
    }

    .tasks-list-main {
      min-height: 1rem;

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
