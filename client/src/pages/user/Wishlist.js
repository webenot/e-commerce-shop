import React from 'react';
import { MDBRow, MDBContainer, MDBCol } from 'mdbreact';

import { UserNav } from 'Components/nav/UserNav';

export const Wishlist = () => (
  <MDBContainer fluid>
    <MDBRow>
      <MDBCol lg="2">
        <UserNav current="user/wishlist" />
      </MDBCol>

      <MDBCol>
        user wishlist
      </MDBCol>
    </MDBRow>
  </MDBContainer>
);
