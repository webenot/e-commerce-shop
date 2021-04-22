import React, { useState, useCallback } from 'react';
import { MDBInput, MDBBtn } from 'mdbreact';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { auth } from 'App/firebase';

export const RegisterForm = () => {
  const [ email, setEmail ] = useState('');

  const handleSubmit = useCallback(async e => {
    e.preventDefault();
    const config = {
      url: 'http://localhost:3000/register/complete',
      handleCodeInApp: true,
    };
    try {
      await auth.sendSignInLinkToEmail(email, config);
    } catch (e) {
      console.error(e);
    }

    // save user email in local storage
    toast.success(`Email is send to ${email}. Click the link to complete your registration`);
    window.localStorage.setItem('emailForSignIn', email);
    // clear state
    setEmail('');
    return false;
  }, [ email ]);

  const handleInputChange = useCallback(e => {
    setEmail(e.target.value);
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <MDBInput
        label="Email"
        type="email"
        value={email}
        onChange={handleInputChange}
        autoFocus
      />
      <MDBBtn className="button-raised" type="submit">Register / {email}</MDBBtn>
    </form>
  );
};
