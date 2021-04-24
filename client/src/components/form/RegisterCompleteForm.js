import React, { useState, useCallback, useEffect } from 'react';
import { MDBInput, MDBBtn } from 'mdbreact';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { auth } from 'App/firebase';

export const RegisterCompleteForm = (/*{ history }*/) => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ password2, setPassword2 ] = useState('');

  useEffect(() => {
    const email = window.localStorage.getItem('emailForRegistration');
    if (email) {
      setEmail(email);
    }
    console.log(process.env.REACT_APP_REGISTER_REDIRECT_URL);
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
      console.log('result', result);
      if (result.user.emailVerified) {
        // remove user from the local storage
        window.localStorage.removeItem('emailForRegistration');
        // get user id token
        const user = auth.currentUser;
        console.log('user', user);
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();
        // redux store
        console.log('idTokenResult', idTokenResult);
        // redirect
        //history.push('/');
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
      <MDBBtn className="btn btn-raised" type="submit">Complete Registration</MDBBtn>
    </form>
  );
};
