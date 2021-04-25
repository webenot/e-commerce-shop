import React from 'react';
import { MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import { LoginForm } from 'Components/form/LoginForm';

export const Login = () => (
  <MDBContainer>
    <MDBRow>
      <MDBCol md="6" className="offset-md-3 p-5">
        <h4>Login</h4>
        <LoginForm />
      </MDBCol>
    </MDBRow>
  </MDBContainer>
);
