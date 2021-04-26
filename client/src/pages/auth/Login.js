import React, { useState } from 'react';
import { MDBCol, MDBContainer, MDBRow } from 'mdbreact';

import { LoginForm } from 'Components/form/LoginForm';
import { LOGIN_TITLE } from 'App/config';

export const Login = () => {
  const [ title, setTitle ] = useState(LOGIN_TITLE);
  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol lg="6" className="offset-lg-3 p-5">
          <h4>{title}</h4>
          <LoginForm setTitle={setTitle} />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};
