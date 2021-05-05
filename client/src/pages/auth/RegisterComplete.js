import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import classnames from 'classnames';

import { RegisterCompleteForm } from 'Components/forms/RegisterCompleteForm';
import { AuthBaseTemplate } from 'Pages/auth';
import { REGISTER_COMPLETE_TITLE, REGISTER_COMPLETE_TITLE_LOADING } from 'App/config';
import { auth } from 'App/firebase';
import { createOrUpdateUser, roleBasedRedirect } from 'Services/authService';
import { LOGGED_IN_USER } from 'Reducers/userReducer';

export const RegisterComplete = ({ history }) => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ password2, setPassword2 ] = useState('');
  const [ loading, setLoading ] = useState(false);
  const [ title, setTitle ] = useState(REGISTER_COMPLETE_TITLE);

  const dispatch = useDispatch();

  useEffect(() => {
    const email = window.localStorage.getItem('emailForRegistration');
    if (email) {
      setEmail(email);
    }
  }, []);

  useEffect(() => {
    setTitle(loading ? REGISTER_COMPLETE_TITLE_LOADING : REGISTER_COMPLETE_TITLE);
  }, [ loading ]);

  const handleSubmit = useCallback(async e => {
    setLoading(true);
    e.preventDefault();
    if (password !== password2) {
      toast.error('Passwords not match');
      setLoading(false);
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
        createOrUpdateUser(user.za)
          .then(response => {
            dispatch({
              type: LOGGED_IN_USER,
              payload: {
                name: response.data.name,
                email: response.data.email,
                token: result.user.za,
                picture: response.data.picture,
                role: response.data.role,
                _id: response.data._id,
              },
            });
            roleBasedRedirect(response, history);
          })
          .catch(error => {
            console.error(error);
            toast.error(error.message);
          });
      } else {
        toast.error('Email validation error');
        setLoading(false);
      }
    } catch (e) {
      console.error(e);
      toast.error(e.message);
      setLoading(false);
    }
    return false;
  }, [ email, password, password2 ]);

  return (
    <AuthBaseTemplate>
      <h4 className={classnames({ 'text-danger': loading })}>{title}</h4>
      <RegisterCompleteForm
        handleSubmit={handleSubmit}
        loading={loading}
        email={email}
        password={password}
        password2={password2}
        setPassword={setPassword}
        setPassword2={setPassword2}
      />
    </AuthBaseTemplate>
  );
};
