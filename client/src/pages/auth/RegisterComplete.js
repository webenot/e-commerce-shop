import React, { useState } from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import { ToastContainer } from 'react-toastify';

import { RegisterCompleteForm } from 'Components/form/RegisterCompleteForm';
import { REGISTER_COMPLETE_TITLE } from 'App/config';

export const RegisterComplete = () => {
  const [ title, setTitle ] = useState(REGISTER_COMPLETE_TITLE);
  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol lg="6" className="offset-lg-3 p-5">
          <h4>{title}</h4>
          <ToastContainer />
          <RegisterCompleteForm setTitle={setTitle} />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};
