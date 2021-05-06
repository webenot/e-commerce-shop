import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import classnames from 'classnames';

import { ForgotPasswordForm } from 'Components/forms/ForgotPasswordForm';
import { AuthBaseTemplate } from 'Pages/auth/index';
import { FORGOT_PASSWORD_TITLE, FORGOT_PASSWORD_TITLE_LOADING } from 'App/config';
import { auth } from 'App/firebase';

export const ForgotPassword = () => {
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

  return (
    <AuthBaseTemplate>
      <h4 className={classnames({ 'text-danger': loading })}>{title}</h4>
      <ForgotPasswordForm
        handleSubmit={handleSubmit}
        disable={loading}
        email={email}
        setEmail={setEmail}
      />
    </AuthBaseTemplate>
  );
};
