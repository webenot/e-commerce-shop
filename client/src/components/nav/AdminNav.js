import React from 'react';
import { MDBNav, MDBNavItem, MDBNavLink } from 'mdbreact';

export const AdminNav = ({ current = '' }) => (
  <nav className="sidebar-navigation">
    <MDBNav pills className="flex-column">
      <MDBNavItem>
        <MDBNavLink
          active={current === '/admin/dashboard'}
          to="/admin/dashboard"
        >Dashboard</MDBNavLink>
      </MDBNavItem>
      <MDBNavItem>
        <MDBNavLink active={current === '/admin/product'} to="/admin/product">Product</MDBNavLink>
      </MDBNavItem>
      <MDBNavItem>
        <MDBNavLink active={current === '/admin/products'} to="/admin/products">Products</MDBNavLink>
      </MDBNavItem>
      <MDBNavItem>
        <MDBNavLink active={current === '/admin/category'} to="/admin/category">Category</MDBNavLink>
      </MDBNavItem>
      <MDBNavItem>
        <MDBNavLink active={current === '/admin/sub'} to="/admin/sub">Subcategory</MDBNavLink>
      </MDBNavItem>
      <MDBNavItem>
        <MDBNavLink active={current === '/admin/coupon'} to="/admin/coupon">Coupon</MDBNavLink>
      </MDBNavItem>

      <MDBNavItem>
        <MDBNavLink active={current === '/user/password'} to="/user/password">Password</MDBNavLink>
      </MDBNavItem>
    </MDBNav>
  </nav>
);
