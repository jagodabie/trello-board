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
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import { Button } from '../UI/Button/Button';
import { ReadModeElement } from '../UI/ReadModeElement/ReadModeElement';
import { useNavigate } from 'react-router-dom';

export const SideNavigation: React.FC<SideNavigationInterface> = ({
  toggleDrawer,
  anchor,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { workspaces } = useAppSelector((state) => state.board);

  return (
    <div
      role='presentation'
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {!!workspaces?.length && (
        <>
          <SideNavigationHeader>My boards</SideNavigationHeader>
          <List role='navigation'>
            {workspaces.map(({ id, name }) => (
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
          aria-label='Add Board'
          text={`Add Workspace`}
          iconComponent={<Plus color='#fff' />}
          onClick={() => {
            const id = generateId();

            dispatch(
              createWorkspace({
                id,
                name: 'New Workspace',
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
