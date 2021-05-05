import React, { useCallback, useEffect, useState } from 'react';
import { MDBRow, MDBContainer, MDBCol } from 'mdbreact';
import { useSelector } from 'react-redux';
import classnames from 'classnames';
import { toast } from 'react-toastify';

import { UserNav } from 'Components/nav/UserNav';
import { ChangePasswordForm } from 'Components/forms/ChangePasswordForm';
import { AdminNav } from 'Components/nav/AdminNav';
import { CHANGE_PASSWORD_TITLE, CHANGE_PASSWORD_TITLE_LOADING } from 'App/config';
import { auth } from 'App/firebase';

export const Password = () => {
  const [ password, setPassword ] = useState('');
  const [ password2, setPassword2 ] = useState('');
  const [ loading, setLoading ] = useState(false);
  const [ title, setTitle ] = useState('');

  const { user } = useSelector(state => state);

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

  return (
    <MDBContainer fluid>
      <MDBRow>
        <MDBCol lg="2">
          {user && user.role === 'admin' && (
            <AdminNav current="user/password" />
          )}
          {user && user.role === 'subscriber' && (
            <UserNav current="user/password" />
          )}
        </MDBCol>
        <MDBCol lg="4">
          <h4 className={classnames({ 'text-danger': loading })}>{title}</h4>
          <ChangePasswordForm
            handleSubmit={handleSubmit}
            loading={loading}
            password={password}
            password2={password2}
            setPassword={setPassword}
            setPassword2={setPassword2}
          />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};
