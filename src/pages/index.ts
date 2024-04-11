import styled from 'styled-components';

export const StyledBoardView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow-x: auto;
  height: 100%;
  width: 100vw;
`;
export const BoardHeader = styled.div`
  width: 100%;
  text-align: left;
  background: ${(props) => props.theme.colors.lightblue};
`;
export const BoardMain = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 0.3rem;
  height: 80vh;
  padding-bottom: 3vh;

  & > button {
    background: ${(props) => props.theme.colors.darkblue};
    width: 14rem;
    height: 2.6rem;
    border-radius: 8px;
    margin: 0.2rem;
  }
`;

export const ReadModeActiveWrapper = styled.div<{
  active?: number;
}>`
  border: solid 0.1px #fff;
  border-radius: 8px;
  outline: solid 0.5px #fff;
  box-shadow: ${({
    theme: {
      boxShadow: { white },
    },
  }) => white};
`;
