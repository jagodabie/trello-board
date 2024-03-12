import './App.css';
import { Routes, Route } from 'react-router-dom';
import { BoardView } from './pages/BoardView';
import { Drawer } from '@mui/material';
import { useState } from 'react';
import { Navigation } from './components/Navigation/Navigation';

function App() {
  const [menuOpen, setMenuOpen] = useState({
    left: false,
  });

  const toggleDrawer = (anchor: string, open: boolean) => () => {
    setMenuOpen({ ...menuOpen, [anchor]: open });
  };

  return (
    <div className='App'>
      <header>
        <h1>My Trello Board</h1>
      </header>

      <main>
        <button onClick={toggleDrawer('left', true)}>Open Left</button>
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

        <Routes>
          {/* TODO: /board/:id */}
          <Route path='/' element={<BoardView id='1' />} />
        </Routes>
      </main>
      <footer>
        <p>© 2024 Trello Board. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
