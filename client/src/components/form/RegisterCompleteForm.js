import React, { useState, useCallback, useEffect } from 'react';
import { MDBInput, MDBBtn } from 'mdbreact';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { auth } from 'App/firebase';
import { LOGGED_IN_USER } from 'Reducers/userReducer';
import { UserAddOutlined } from '@ant-design/icons';

export const RegisterCompleteForm = () => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ password2, setPassword2 ] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const email = window.localStorage.getItem('emailForRegistration');
    if (email) {
      setEmail(email);
    }
  }, []);

  const handleSubmit = useCallback(async e => {
    e.preventDefault();
    if (!email || !password || !password2) {
      toast.error('Email, password and password confirmation is required');
      return false;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return false;
    }
    if (password !== password2) {
      toast.error('Passwords not match');
      return false;
    }
    try {
      const result = await auth.signInWithEmailLink(email, window.location.href);
      if (result.user.emailVerified) {
        // remove user from the local storage
        window.localStorage.removeItem('emailForRegistration');
        // get user id token
        const user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();
        // redux store
        dispatch({
          type: LOGGED_IN_USER,
          payload: {
            name: user.displayName ? user.displayName : user.email,
            email: user.email,
            token: idTokenResult.token,
          },
        });
        // redirect
        history.push('/');
      } else {
        toast.error('Email validation error');
      }
    } catch (e) {
      console.error(e);
      toast.error(e.message);
    }
    return false;
  }, [ email, password, password2 ]);

  const handlePasswordInputChange = useCallback(e => {
    setPassword(e.target.value);
  }, []);

  const handlePassword2InputChange = useCallback(e => {
    setPassword2(e.target.value);
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <MDBInput
        label="Email"
        type="email"
        value={email}
        disabled
      />
      <MDBInput
        label="Password"
        type="password"
        value={password}
        onChange={handlePasswordInputChange}
        autoFocus
        placeholder="Enter your password"
      />
      <MDBInput
        label="Password confirmation"
        type="password"
        value={password2}
        onChange={handlePassword2InputChange}
        placeholder="Confirm your password"
      />
      <MDBBtn
        disabled={!email || password.length < 6 || password2.length < 6 || password !== password2}
        size="lg"
        color="primary"
        className="btn-rounded btn-block"
        type="submit"
      >
        <UserAddOutlined />
        <span>Complete Registration</span>
      </MDBBtn>
    </form>
  );
};
