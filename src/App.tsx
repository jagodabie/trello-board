import { Routes, Route } from 'react-router-dom';
import { BoardView } from './pages/BoardView';
import { Drawer } from '@mui/material';
import { useState } from 'react';
import { Navigation } from './components/NavigationLeft/NavigationLeft';
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

function App() {
  const [menuOpen, setMenuOpen] = useState({
    left: false,
  });

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
          >
            <Navigation
              anchor='left'
              toggleDrawer={
                toggleDrawer as (anchor: string, open: boolean) => () => void
              }
              boardsList={['Board 1', 'Board 2', 'Board 3']}
            />
          </Drawer>
          <SideElementNavigation>
            <SideButtonWrapper>
              <Button text={'>'} onClick={toggleDrawer('left', true)} />
            </SideButtonWrapper>
          </SideElementNavigation>

          <Routes>
            {/* TODO: /board/:id */}
            <Route path='/' element={<BoardView id='1' />} />
          </Routes>
        </AppMain>
      </AppContainer>
    </AppProviders>
  );
}

export default App;
