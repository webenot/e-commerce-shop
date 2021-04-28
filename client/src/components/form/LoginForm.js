import React, { useState, useCallback, useEffect } from 'react';
import { MDBInput, MDBBtn } from 'mdbreact';
import { useHistory } from 'react-router-dom';
import { GoogleOutlined, MailOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';

import { LOGIN_TITLE, LOGIN_TITLE_LOADING } from 'App/config';
import { authUser } from 'Services/authUser';

export const LoginForm = ({ setTitle }) => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ loading, setLoading ] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    setTitle(loading ? LOGIN_TITLE_LOADING : LOGIN_TITLE);
  }, [ loading ]);

  const handleSubmit = useCallback(e => {
    e.preventDefault();
    authUser(
      'email',
      setLoading,
      'Could not login with this email and password',
      history,
      dispatch,
      email,
      password,
    );
  }, [ email, password ]);

  const handleEmailChange = useCallback(e => {
    setEmail(e.target.value);
  }, []);

  const handlePasswordChange = useCallback(e => {
    setPassword(e.target.value);
  }, []);

  const handleGoogleLogin = useCallback(() => {
    authUser(
      'google',
      setLoading,
      'Could not login with Google service',
      history,
      dispatch,
    );
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <MDBInput
        disabled={loading}
        label="Email"
        type="email"
        value={email}
        onChange={handleEmailChange}
        autoFocus
      />
      <MDBInput
        disabled={loading}
        label="Password"
        type="password"
        value={password}
        onChange={handlePasswordChange}
      />
      <MDBBtn
        disabled={!email || password.length < 6 || loading}
        color="primary"
        className="btn-rounded btn-block"
        type="submit"
        tabIndex="1"
      >
        <MailOutlined />
        <span>Login with Email/Password</span>
      </MDBBtn>
      <br />
      <MDBBtn
        color="danger"
        className="btn-rounded btn-block"
        onClick={handleGoogleLogin}
      >
        <GoogleOutlined />
        <span>Login with Google</span>
      </MDBBtn>
    </form>
  );
};
