import React, { useState, useCallback, useEffect } from 'react';
import { MDBInput, MDBBtn } from 'mdbreact';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { auth } from 'App/firebase';
import { UserAddOutlined } from '@ant-design/icons';
import { REGISTER_TITLE, REGISTER_COMPLETE_TITLE_LOADING } from 'App/config';
import { createOrUpdateUser } from 'Services/createOrUpdateUser';
import { LOGGED_IN_USER } from 'Reducers/userReducer';

export const RegisterCompleteForm = ({ setTitle }) => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ password2, setPassword2 ] = useState('');
  const [ loading, setLoading ] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const email = window.localStorage.getItem('emailForRegistration');
    if (email) {
      setEmail(email);
    }
  }, []);

  useEffect(() => {
    setTitle(loading ? REGISTER_COMPLETE_TITLE_LOADING : REGISTER_TITLE);
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
          })
          .catch(error => {
            console.error(error);
            toast.error(error.message);
          });
        // redirect
        history.push('/');
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
        disabled={loading}
        label="Password"
        type="password"
        value={password}
        onChange={handlePasswordInputChange}
        autoFocus
        placeholder="Enter your password"
      />
      <MDBInput
        disabled={loading}
        label="Password confirmation"
        type="password"
        value={password2}
        onChange={handlePassword2InputChange}
        placeholder="Confirm your password"
      />
      <MDBBtn
        disabled={!email || password.length < 6 || password2.length < 6 || loading}
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
