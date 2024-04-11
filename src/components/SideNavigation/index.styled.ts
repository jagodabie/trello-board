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

export const ButtonWrapper = styled.div`
  height: 40px;
  box-shadow: ${({
    theme: {
      boxShadow: { white },
    },
  }) => white};
  margin-left: 3px;
  border-radius: 8px;
  width: calc(100% - 6px);
  &:hover,
  &:focus {
    background: ${({
      theme: {
        colors: { sideBarColorHover },
      },
    }) => sideBarColorHover};
  }
`;

export const SideNavigationHeader = styled.h2`
  text-align: center;
  padding: 1rem 0;
  font-weight: 400;
  font-size: 20px;
  box-shadow: ${({
    theme: {
      boxShadow: { white },
    },
  }) => white};
`;
