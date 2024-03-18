import styled from 'styled-components';

export const TasksGroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  justify-content: space-between;
  background: #000420;
  width: 14rem;
  margin: 0.2rem;

  .tasks-list-header {
    box-sizing: border-box;
    width: 100%;

    &:hover {
      background: #002e4e;
      border-radius: 8px 8px 0 0;
    }
  }

  .tasks-list-main {
    min-height: 1rem;
  }

  .tasks-list-footer {
    box-sizing: border-box;
    width: 100%;

    &:hover {
      background: #002e4e;
      border-radius: 0 0 8px 8px;
    }
  }
}`;
