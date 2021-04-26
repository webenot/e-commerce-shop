import React, { useEffect, useState } from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import { useSelector } from 'react-redux';

import { ForgotPasswordForm } from 'Components/form/ForgotPasswordForm';
import { FORGOT_PASSWORD_TITLE } from 'App/config';

export const ForgotPassword = ({ history }) => {
  const [ title, setTitle ] = useState(FORGOT_PASSWORD_TITLE);
  const { user } = useSelector(state => state);

  useEffect(() => {
    if (user && user.token) {
      history.push('/dashboard');
    }
  }, [ user ]);

  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol lg="6" className="offset-lg-3 p-5">
          <h4>{title}</h4>
          <ForgotPasswordForm setTitle={setTitle} />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};
