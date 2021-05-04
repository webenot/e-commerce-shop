import React, { useState, useCallback, useEffect } from 'react';
import { MDBInput, MDBBtn } from 'mdbreact';
import { toast } from 'react-toastify';
import classnames from 'classnames';
import { UserAddOutlined } from '@ant-design/icons';

import { auth } from 'App/firebase';
import { REGISTER_TITLE, REGISTER_TITLE_LOADING } from 'App/config';

export const RegisterForm = () => {
  const [ email, setEmail ] = useState('');
  const [ loading, setLoading ] = useState(false);
  const [ title, setTitle ] = useState(REGISTER_TITLE);

  useEffect(() => {
    setTitle(loading ? REGISTER_TITLE_LOADING : REGISTER_TITLE);
  }, [ loading ]);

  const handleSubmit = useCallback(async e => {
    setLoading(true);
    e.preventDefault();
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };
    try {
      await auth.sendSignInLinkToEmail(email, config);
    } catch (e) {
      console.error(e);
      toast.error(e.message);
      setLoading(false);
      return false;
    }

    // save user email in local storage
    toast.success(`Email is send to ${email}. Click the link to complete your registration`);
    window.localStorage.setItem('emailForRegistration', email);
    // clear state
    setEmail('');
    setLoading(false);
    return false;
  }, [ email ]);

  const handleInputChange = useCallback(e => {
    setEmail(e.target.value);
  }, []);

  return (
    <>
      <h4 className={classnames({ 'text-danger': loading })}>{title}</h4>
      <form onSubmit={handleSubmit}>
        <MDBInput
          disabled={loading}
          label="Email"
          type="email"
          value={email}
          onChange={handleInputChange}
          autoFocus
        />
        <MDBBtn
          disabled={!email || email.indexOf('@') === -1 || email.indexOf('@') === email.length - 1 || loading}
          color="primary"
          className="btn-rounded btn-block"
          type="submit"
        >
          <UserAddOutlined />
          <span>Register / {email}</span>
        </MDBBtn>
      </form>
    </>
  );
};
