import { List, ListItem, ListItemText } from '@mui/material';
import { NavigationInterface } from './Navigation.type';

export const Navigation: React.FC<NavigationInterface> = ({
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
      {boardsList?.length ? (
        <List>
          {boardsList.map((text) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      ) : (
        //  TODO: change it
        <p>No Boards Available</p>
      )}
    </div>
  );
};
