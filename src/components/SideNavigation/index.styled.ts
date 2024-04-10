import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ListItem } from '@mui/material';

export const NavbarLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.white};
`;

export const StyledListItem = styled(ListItem)(({ theme }) => ({
  '&:hover, &:active': {
    background: theme.colors.sideBarColorHover,
  },
}));
