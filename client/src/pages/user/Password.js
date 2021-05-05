import React from 'react';
import { MDBRow, MDBContainer, MDBCol } from 'mdbreact';
import { useSelector } from 'react-redux';

import { UserNav } from 'Components/nav/UserNav';
import { ChangePasswordForm } from 'Components/forms/ChangePasswordForm';
import { AdminNav } from 'Components/nav/AdminNav';

export const Password = () => {
  const { user } = useSelector(state => state);

  return (
    <MDBContainer fluid>
      <MDBRow>
        <MDBCol lg="2">
          {user && user.role === 'admin' && (
            <AdminNav current="user/password" />
          )}
          {user && user.role === 'subscriber' && (
            <UserNav current="user/password" />
          )}
        </MDBCol>

        <MDBCol lg="4">
          <ChangePasswordForm />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};
