import React, { useState, useCallback, useEffect } from 'react';
import { MDBInput, MDBBtn } from 'mdbreact';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { GoogleOutlined, MailOutlined } from '@ant-design/icons';

import { auth, googleAuthProvider } from 'App/firebase';
import { LOGIN_TITLE, LOGIN_TITLE_LOADING } from 'App/config';

export const LoginForm = ({ setTitle }) => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ loading, setLoading ] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setTitle(loading ? LOGIN_TITLE_LOADING : LOGIN_TITLE);
  }, [ loading ]);

  const handleSubmit = useCallback(async e => {
    setLoading(true);
    e.preventDefault();
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      console.log({ result });
      if (result.user) {
        toast.success('Welcome');
        history.push('/dashboard');
      } else {
        toast.error('Could not login with this email and password');
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
      toast.error(e.message);
      setLoading(false);
    }
    return false;
  }, [ email, password ]);

  const handleEmailChange = useCallback(e => {
    setEmail(e.target.value);
  }, []);

  const handlePasswordChange = useCallback(e => {
    setPassword(e.target.value);
  }, []);

  const handleGoogleLogin = useCallback(async () => {
    setLoading(true);
    try {
      const result = await auth.signInWithPopup(googleAuthProvider);
      if (result.user) {
        toast.success('Welcome');
        history.push('/dashboard');
      } else {
        toast.error('Could not login with Google service');
        setLoading(false);
      }
    } catch (e) {
      console.error(e);
      toast.error(e.message);
      setLoading(false);
    }
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
