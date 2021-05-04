import React, { useState, useCallback, useEffect } from 'react';
import { MDBBtn, MDBInput } from 'mdbreact';
import { SaveOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import classnames from 'classnames';

import { auth } from 'App/firebase';
import { CHANGE_PASSWORD_TITLE, CHANGE_PASSWORD_TITLE_LOADING } from 'App/config';

export const ChangePasswordForm = () => {
  const [ password, setPassword ] = useState('');
  const [ password2, setPassword2 ] = useState('');
  const [ loading, setLoading ] = useState(false);
  const [ title, setTitle ] = useState('');

  useEffect(() => {
    setTitle(loading ? CHANGE_PASSWORD_TITLE_LOADING : CHANGE_PASSWORD_TITLE);
  }, [ loading ]);

  const handleSubmit = useCallback(async e => {
    e.preventDefault();
    setLoading(true);
    if (password !== password2) {
      toast.error('Passwords not match');
      setLoading(false);
      return false;
    }
    try {
      await auth.currentUser.updatePassword(password);
      toast.success('Your password is updated');
      setPassword('');
      setPassword2('');
    } catch (e) {
      toast.error(e.message);
    }
    setLoading(false);
    return false;
  }, [ password, password2 ]);

  const handlePasswordInputChange = useCallback(e => {
    setPassword(e.target.value);
  }, []);

  const handlePassword2InputChange = useCallback(e => {
    setPassword2(e.target.value);
  }, []);

  return (
    <>
      <h4 className={classnames({ 'text-danger': loading })}>{title}</h4>
      <form onSubmit={handleSubmit}>
        <MDBInput
          disabled={loading}
          label="New password"
          type="password"
          value={password}
          onChange={handlePasswordInputChange}
          autoFocus
          required
        />
        <MDBInput
          disabled={loading}
          label="New password confirmation"
          type="password"
          value={password2}
          onChange={handlePassword2InputChange}
          required
        />
        <MDBBtn
          disabled={password.length < 6 || password2.length < 6 || loading}
          color="primary"
          className="btn-rounded btn-block"
          type="submit"
        >
          <SaveOutlined />
          <span>Save New Password</span>
        </MDBBtn>
      </form>
    </>
  );
};
