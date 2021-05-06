import React from 'react';
import { MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import { UserNav } from 'Components/nav/UserNav';

export const UserBase = ({ children }) => (
  <MDBContainer fluid className="pt-3">
    <MDBRow>
      <MDBCol lg="2">
        <UserNav current="user/history" />
      </MDBCol>
      <MDBCol>
        {children}
      </MDBCol>
    </MDBRow>
  </MDBContainer>
);
