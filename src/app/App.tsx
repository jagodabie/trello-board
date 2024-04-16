import { Routes, Route } from 'react-router-dom';
import { BoardView } from '../pages/BoardView/BoardView';

import { globalTheme as theme } from '../styles/globalTheme';
import GlobalStyle from '../styles/GlobalStyles.styled';

import { AppContainer, AppHeader, AppMain } from '../index.styled';
import AppProviders from '../providers/AppProvider';
import { Playground } from '../pages/Playground/Playground';
import { CustomDrawer } from '../components/Drawer/Drawer';

const Router = () => {
  return (
    <Routes>
      <Route path='/board/:id' element={<BoardView />} />
      <Route path='/playground' element={<Playground />}></Route>
    </Routes>
  );
};

const App = () => {
  return (
    <AppProviders theme={theme}>
      <GlobalStyle />
      <AppContainer>
        <AppHeader>My Trello Board / Further Navigation</AppHeader>
        <Router />
        <AppMain>
          <CustomDrawer />
        </AppMain>
      </AppContainer>
    </AppProviders>
  );
};

export default App;
