import { Avatar, List } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import { SideNavigationInterface } from './SideNavigation.type';

import {
  ButtonWrapper,
  NavbarLink,
  SideNavigationHeader,
  StyledListItem,
} from './index.styled';
import { Plus } from '../../assets/icons/Plus';
import { generateId } from '../../utils';
import {
  createWorkspace,
  setActiveItem,
  setActiveWorkspace,
} from '../../store/slices/actions';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { Button } from '../UI/Button/Button';
import { ReadModeElement } from '../UI/ReadModeElement/ReadModeElement';
import { useNavigate } from 'react-router-dom';

export const SideNavigation: React.FC<SideNavigationInterface> = ({
  toggleDrawer,
  anchor,
  boardsList,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div
      role='presentation'
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {boardsList?.length && (
        <>
          <SideNavigationHeader>My boards</SideNavigationHeader>
          <List>
            {boardsList.map(({ id, name }) => (
              <StyledListItem key={id}>
                <NavbarLink to={`/board/${id}`}>
                  <Avatar
                    variant='square'
                    sx={{
                      borderRadius: '5px',
                      height: '30px',
                      width: '30px',
                    }}
                  >
                    <FolderIcon />
                  </Avatar>
                  <ReadModeElement
                    key={id}
                    name={name}
                    boardElementClass='sidebar-item'
                    isActionVisible={false}
                  />
                </NavbarLink>
              </StyledListItem>
            ))}
          </List>
        </>
      )}
      <ButtonWrapper>
        <Button
          text={`Add Workspace`}
          iconComponent={<Plus color='#fff' />}
          onClick={() => {
            const id = generateId();

            dispatch(
              createWorkspace({
                id,
                name: '',
                tasksGroups: [],
              })
            );
            navigate(`/board/${id}`);
            dispatch(setActiveWorkspace(id));
            dispatch(setActiveItem(id));
          }}
        />
      </ButtonWrapper>
    </div>
  );
};
