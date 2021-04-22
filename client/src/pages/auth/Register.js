import React from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import { ToastContainer } from 'react-toastify';

import { RegisterForm } from 'Components/form/RegisterForm';

export const Register = () => (
  <MDBContainer>
    <MDBRow>
      <MDBCol md="6" className="offset-md-3">
        <h4>Register</h4>
        <ToastContainer />
        <RegisterForm />
      </MDBCol>
    </MDBRow>
  </MDBContainer>
);
