import { Avatar, List, ListItemText } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import { SideNavigationInterface } from './SideNavigation.type';

import { NavbarLink, StyledListItem } from './index.styled';

export const SideNavigation: React.FC<SideNavigationInterface> = ({
  toggleDrawer,
  anchor,
  boardsList,
}) => {
  return (
    <div
      role='presentation'
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {boardsList?.length && (
        <List>
          {boardsList.map(({ id, name }) => (
            <StyledListItem key={id}>
              <NavbarLink to={`/board/${id}`}>
                <Avatar
                  variant='square'
                  sx={{
                    borderRadius: '5px',
                  }}
                >
                  <FolderIcon />
                </Avatar>
                <ListItemText
                  primary={name}
                  primaryTypographyProps={{
                    fontWeight: '600',
                    marginLeft: '10px',
                    fontSize: '15px',
                  }}
                />
              </NavbarLink>
            </StyledListItem>
          ))}
        </List>
      )}
    </div>
  );
};
