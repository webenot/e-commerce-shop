import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { MDBBtn } from 'mdbreact';
import { GoogleOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';

import { LoginForm } from 'Components/forms/LoginForm';
import { AuthBaseTemplate } from 'Pages/auth/index';
import { LOGIN_TITLE, LOGIN_TITLE_LOADING } from 'App/config';
import { authUser } from 'Services/authService';

export const Login = ({ history }) => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ loading, setLoading ] = useState(false);
  const [ title, setTitle ] = useState(LOGIN_TITLE);
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
    <AuthBaseTemplate>
      <h4 className={classnames({ 'text-danger': loading })}>{title}</h4>
      <LoginForm
        handleSubmit={handleSubmit}
        loading={loading}
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
      />
      <br />
      <div>
        <MDBBtn
          color="danger"
          className="btn-rounded btn-block"
          onClick={handleGoogleLogin}
        >
          <GoogleOutlined />
          <span>Login with Google</span>
        </MDBBtn>
      </div>

      <br />
      <Link to="/forgot/password" className="float-right text-danger">Forgot your password?</Link>
    </AuthBaseTemplate>
  );
};
