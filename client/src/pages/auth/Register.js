import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import classnames from 'classnames';

import { RegisterForm } from 'Components/forms/RegisterForm';
import { AuthBaseTemplate } from 'Pages/auth/index';
import { REGISTER_TITLE, REGISTER_TITLE_LOADING } from 'App/config';
import { auth } from 'App/firebase';

export const Register = () => {
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

  return (
    <AuthBaseTemplate>
      <h4 className={classnames({ 'text-danger': loading })}>{title}</h4>
      <RegisterForm
        handleSubmit={handleSubmit}
        disable={loading}
        email={email}
        setEmail={setEmail}
      />
    </AuthBaseTemplate>
  );
};
