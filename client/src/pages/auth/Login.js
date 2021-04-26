import React, { useEffect, useState } from 'react';
import { MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { LoginForm } from 'Components/form/LoginForm';
import { LOGIN_TITLE } from 'App/config';

export const Login = ({ history }) => {
  const [ title, setTitle ] = useState(LOGIN_TITLE);
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
          <LoginForm setTitle={setTitle} />
          <br />
          <Link to="/forgot/password" className="float-right text-danger">Forgot your password?</Link>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};
