import React from 'react';
import { MDBNav, MDBNavItem, MDBNavLink } from 'mdbreact';

export const AdminNav = ({ current }) => (
  <nav>
    <MDBNav className="flex-column">
      <MDBNavItem>
        <MDBNavLink active={current === '/admin/dashboard'} to="/admin/dashboard">Dashboard</MDBNavLink>
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
