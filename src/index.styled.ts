import { styled } from 'styled-components';

export const AppContainer = styled.div`
  text-align: center;
`;

export const SideButtonWrapper = styled.div`
  position: fixed;
  top: 50px;
  left: 5px;
  button {
    background: ${({
      theme: {
        colors: { backgroundDarkBlue },
      },
    }) => backgroundDarkBlue};
    height: 30px;
    width: 30px;
    border-radius: 50px;
  }
  button:hover {
    background: ${({
      theme: {
        colors: { darkblueHover },
      },
    }) => darkblueHover};
  }
`;

export const SideElementNavigation = styled.div`
  background: ${({
    theme: {
      colors: { darkblueHover },
    },
  }) => darkblueHover};
  height: 100vh;
  width: 20px;
`;

export const AppHeader = styled.header`
  background: ${({ theme }) => theme.background};
  width: 100%;
  height: 40px;

  box-shadow: ${({
    theme: {
      boxShadow: { white },
    },
  }) => white};
`;

export const AppMain = styled.main`
  display: flex;
  scroll-x: auto;
`;
