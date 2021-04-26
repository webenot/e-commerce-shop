import React, { useEffect, useState } from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';

import { RegisterCompleteForm } from 'Components/form/RegisterCompleteForm';
import { REGISTER_COMPLETE_TITLE } from 'App/config';

export const RegisterComplete = ({ history }) => {
  const [ title, setTitle ] = useState(REGISTER_COMPLETE_TITLE);
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
          <ToastContainer />
          <RegisterCompleteForm setTitle={setTitle} />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};
