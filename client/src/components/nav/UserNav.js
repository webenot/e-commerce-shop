import React from 'react';
import { MDBNav, MDBNavItem, MDBNavLink } from 'mdbreact';

export const UserNav = ({ current }) => (
  <nav>
    <MDBNav className="flex-column">
      <MDBNavItem>
        <MDBNavLink active={current === '/user/history'} to="/user/history">History</MDBNavLink>
      </MDBNavItem>
      <MDBNavItem>
        <MDBNavLink active={current === '/user/password'} to="/user/password">Password</MDBNavLink>
      </MDBNavItem>
      <MDBNavItem>
        <MDBNavLink active={current === '/user/wishlist'} to="/user/wishlist">Wishlist</MDBNavLink>
      </MDBNavItem>
    </MDBNav>
  </nav>
);
