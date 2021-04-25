import React, { useState, useCallback } from 'react';
import { MDBInput, MDBBtn } from 'mdbreact';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { MailOutlined } from '@ant-design/icons';

import { auth } from 'App/firebase';

export const LoginForm = () => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ loading, setLoading ] = useState(false);
  const history = useHistory();

  const handleSubmit = useCallback(async e => {
    setLoading(true);
    e.preventDefault();
    if (!email || !password) {
      toast.error('Email and password is required');
      setLoading(false);
      return false;
    }
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      console.log({ result });
      if (result.user) {
        toast.success('Welcome');
        history.push('/dashboard');
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

  return (
    <form onSubmit={handleSubmit}>
      <MDBInput
        label="Email"
        type="email"
        value={email}
        onChange={handleEmailChange}
      />
      <MDBInput
        label="Password"
        type="password"
        value={password}
        onChange={handlePasswordChange}
        autoFocus
      />
      <MDBBtn
        disabled={!email || password.length < 6 || loading}
        size="lg"
        color="primary"
        className="btn-rounded btn-block"
        type="submit"
      >
        <MailOutlined />
        <span>Login with Email/Password</span>
      </MDBBtn>
    </form>
  );
};
