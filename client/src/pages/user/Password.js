import React from 'react';
import { MDBRow, MDBContainer, MDBCol } from 'mdbreact';

import { UserNav } from 'Components/nav/UserNav';
import { ChangePasswordForm } from 'Components/form/ChangePasswordForm';

export const Password = () => (
  <MDBContainer fluid>
    <MDBRow>
      <MDBCol lg="2">
        <UserNav current="user/password" />
      </MDBCol>

      <MDBCol lg="4">
        <ChangePasswordForm />
      </MDBCol>
    </MDBRow>
  </MDBContainer>
);
