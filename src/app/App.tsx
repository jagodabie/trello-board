import { BoardView } from '../pages/BoardView/BoardView';

import { globalTheme as theme } from '../styles/globalTheme';
import GlobalStyle from '../styles/GlobalStyles.styled';

import { AppContainer, AppHeader, AppMain } from '../index.styled';
import AppProviders from '../providers/AppProvider';
import { CustomDrawer } from '../components/Drawer/Drawer';
import { Playground } from '../pages/Playground/Playground';
import { CustomRouter } from '../router/CustomRouter';
import { HomePage } from '../pages/HomePage/HomePage';

const App = () => {
  return (
    <AppProviders theme={theme}>
      <GlobalStyle />
      <AppContainer>
        <AppHeader>My Trello Board / Further Navigation</AppHeader>
        <CustomRouter
          components={[
            {
              path: '/board/:id',
              component: <BoardView />,
            },
            {
              path: '/playground',
              component: <Playground />,
            },
            {
              path: '/',
              component: <HomePage />,
            },
            {
              path: '/trello-board',
              component: <HomePage />,
            },
          ]}
        />
        <AppMain>
          <CustomDrawer />
        </AppMain>
      </AppContainer>
    </AppProviders>
  );
};

export default App;
