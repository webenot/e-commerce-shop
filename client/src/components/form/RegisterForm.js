import React, { useState, useCallback } from 'react';
import { MDBInput, MDBBtn } from 'mdbreact';
import { toast } from 'react-toastify';

import { auth } from 'App/firebase';
import { UserAddOutlined } from '@ant-design/icons';

export const RegisterForm = () => {
  const [ email, setEmail ] = useState('');

  const handleSubmit = useCallback(async e => {
    e.preventDefault();
    if (!email) {
      toast.error('Email is required');
      return false;
    }
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };
    try {
      await auth.sendSignInLinkToEmail(email, config);
    } catch (e) {
      console.error(e);
      toast.error(e.message);
      return false;
    }

    // save user email in local storage
    toast.success(`Email is send to ${email}. Click the link to complete your registration`);
    window.localStorage.setItem('emailForRegistration', email);
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
      <MDBBtn
        disabled={!email || email.indexOf('@') === -1 || email.indexOf('@') === email.length - 1}
        color="primary"
        size="lg"
        className="btn-rounded btn-block"
        type="submit"
      >
        <UserAddOutlined />
        <span>Register / {email}</span>
      </MDBBtn>
    </form>
  );
};
