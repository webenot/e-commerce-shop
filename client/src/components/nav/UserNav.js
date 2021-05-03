import React from 'react';
import { MDBNav, MDBNavItem, MDBNavLink } from 'mdbreact';

export const UserNav = () => (
  <nav>
    <MDBNav className="flex-column">
      <MDBNavItem>
        <MDBNavLink active to="/user/history">History</MDBNavLink>
      </MDBNavItem>
      <MDBNavItem>
        <MDBNavLink to="/user/password">Password</MDBNavLink>
      </MDBNavItem>
      <MDBNavItem>
        <MDBNavLink to="/user/wishlist">Wishlist</MDBNavLink>
      </MDBNavItem>
    </MDBNav>
  </nav>
);
