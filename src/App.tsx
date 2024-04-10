import { Routes, Route } from 'react-router-dom';
import { BoardView } from './pages/BoardView';
import { Drawer } from '@mui/material';
import { useState } from 'react';
import { SideNavigation } from './components/SideNavigation/SideNavigation';
import { Button } from './components/UI/Button/Button';
import { globalTheme as theme } from './styles/globalTheme';
import GlobalStyle from './styles/GlobalStyles.styled';

import {
  AppContainer,
  AppHeader,
  AppMain,
  SideButtonWrapper,
  SideElementNavigation,
} from './index.styled';
import AppProviders from './providers/AppProvider';
import { useAppSelector } from './hooks/useAppDispatch';

function App() {
  const [menuOpen, setMenuOpen] = useState({
    left: false,
  });
  const { workspaces } = useAppSelector((state) => state.board);

  const toggleDrawer = (anchor: string, open: boolean) => () => {
    setMenuOpen({ ...menuOpen, [anchor]: open });
  };

  return (
    <AppProviders theme={theme}>
      <GlobalStyle />
      <AppContainer>
        <AppHeader>My Trello Board / Further Navigation</AppHeader>

        <AppMain>
          <Drawer
            anchor={'left'}
            open={menuOpen['left']}
            onClose={toggleDrawer('left', false)}
            sx={{
              '& .MuiDrawer-paper': {
                width: '250px',
                backgroundColor: theme.colors.darkblue,
                color: theme.colors.white,
              },
            }}
          >
            <SideNavigation
              anchor='left'
              toggleDrawer={
                toggleDrawer as (anchor: string, open: boolean) => () => void
              }
              boardsList={workspaces.map((workspace) => ({
                id: workspace.id,
                name: workspace.name,
              }))}
            />
          </Drawer>
          <SideElementNavigation>
            <SideButtonWrapper>
              <Button text={'>'} onClick={toggleDrawer('left', true)} />
            </SideButtonWrapper>
          </SideElementNavigation>

          <Routes>
            {/* TODO: /board/:id */}
            <Route path='/board/:id' element={<BoardView />} />
          </Routes>
        </AppMain>
      </AppContainer>
    </AppProviders>
  );
}

export default App;
