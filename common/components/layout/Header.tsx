import React from 'react';
import styled from 'styled-components';

import { useColors } from '@hooks/index';

const Logo = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 1.2rem;
`;

const NavList = styled.ul`
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  margin: 0 10px;
`;

const IconGroup = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.span`
  margin-left: 15px;
  cursor: pointer;
`;

const Header = () => {
  const colors = useColors();

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div
        className="flex justify-center w-full"
        style={{ borderBottom: `1px solid ${colors.$1}` }}
      >
        <div className="flex w-4/5 justify-between items-center text-sm py-2">
          <div className="flex list-none m-0 p-0">
            <NavItem>About Us</NavItem>
            <NavItem>Privacy</NavItem>
            <NavItem>Contact</NavItem>
          </div>

          <div className="flex space-x-2">
            <span className="border-r pr-2">My Wishlist</span>

            <div>Insta</div>
          </div>
        </div>
      </div>

      <div className="flex items-center w-4/5">
        <Logo>
          <span style={{ color: 'red' }}>●</span> Capital Shop
        </Logo>
        <NavList>
          <NavItem>Home</NavItem>
          <NavItem>Men</NavItem>
          <NavItem>Women</NavItem>
          <NavItem>Pages ▼</NavItem>
        </NavList>
      </div>

      <IconGroup>
        <Icon>🔍</Icon>
        <Icon>👤</Icon>
        <Icon>
          🛒<sup>1</sup>
        </Icon>
      </IconGroup>
    </div>
  );
};

export default Header;
