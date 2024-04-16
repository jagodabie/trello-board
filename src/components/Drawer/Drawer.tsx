import { Drawer } from '@mui/material';
import { SideNavigation } from '../SideNavigation/SideNavigation';
import { SideButtonWrapper, SideElementNavigation } from '../../index.styled';
import { Button } from '../UI/Button/Button';
import { globalTheme as theme } from '../../styles/globalTheme';
import { useState } from 'react';
import { useAppSelector } from '../../hooks/useAppDispatch';

export const CustomDrawer = () => {
  const [menuOpen, setMenuOpen] = useState({
    left: false,
  });
  const { activeWorkspace } = useAppSelector((state) => state.board);

  const toggleDrawer = (anchor: string, open: boolean) => () => {
    setMenuOpen({ ...menuOpen, [anchor]: open });
  };

  return (
    <>
      <Drawer
        data-testid='drawer-testid'
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
          id={activeWorkspace || ''}
        />
      </Drawer>
      <SideElementNavigation>
        <SideButtonWrapper>
          <Button
            text={'>'}
            onClick={toggleDrawer('left', true)}
            ariaLabel='Open drawer'
          />
        </SideButtonWrapper>
      </SideElementNavigation>
    </>
  );
};
