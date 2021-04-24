import React from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import { ToastContainer } from 'react-toastify';

import { RegisterCompleteForm } from 'Components/form/RegisterCompleteForm';

export const RegisterComplete = () => (
  <MDBContainer>
    <MDBRow>
      <MDBCol md="6" className="offset-md-3 p-5">
        <h4>Register Complete</h4>
        <ToastContainer />
        <RegisterCompleteForm />
      </MDBCol>
    </MDBRow>
  </MDBContainer>
);
