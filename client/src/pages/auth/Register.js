import React from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';

import { RegisterForm } from 'Components/form/RegisterForm';

export const Register = () => (
  <MDBContainer>
    <MDBRow>
      <MDBCol md="6" className="offset-md-3 p-5">
        <h4>Register</h4>
        <RegisterForm />
      </MDBCol>
    </MDBRow>
  </MDBContainer>
);
