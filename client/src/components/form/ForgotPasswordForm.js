import React, { useState, useCallback, useEffect } from 'react';
import { MDBInput, MDBBtn } from 'mdbreact';
import { toast } from 'react-toastify';
import classnames from 'classnames';
import { MailOutlined } from '@ant-design/icons';

import { auth } from 'App/firebase';
import { FORGOT_PASSWORD_TITLE, FORGOT_PASSWORD_TITLE_LOADING } from 'App/config';

export const ForgotPasswordForm = () => {
  const [ email, setEmail ] = useState('');
  const [ loading, setLoading ] = useState(false);
  const [ title, setTitle ] = useState(FORGOT_PASSWORD_TITLE);

  useEffect(() => {
    setTitle(loading ? FORGOT_PASSWORD_TITLE_LOADING : FORGOT_PASSWORD_TITLE);
  }, [ loading ]);

  const handleSubmit = useCallback(async e => {
    setLoading(true);
    e.preventDefault();
    const config = {
      url: process.env.REACT_APP_RESET_PASSWORD_REDIRECT_URL,
      handleCodeInApp: true,
    };
    try {
      await auth.sendPasswordResetEmail(email, config);
      // save user email in local storage
      toast.success(`Email is send to ${email}. Click the link to set up new password`);
      window.localStorage.setItem('emailForResetPassword', email);
      // clear state
      setEmail('');
      setLoading(false);
      return false;
    } catch (e) {
      console.error(e);
      toast.error(e.message);
      setLoading(false);
      return false;
    }
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
          required
        />
        <MDBBtn
          disabled={!email || email.indexOf('@') === -1 || email.indexOf('@') === email.length - 1 || loading}
          color="primary"
          className="btn-rounded btn-block"
          type="submit"
        >
          <MailOutlined />
          <span>Restore / {email}</span>
        </MDBBtn>
      </form>
    </>
  );
};
