import React, { useCallback } from 'react';
import { MDBBtn, MDBInput } from 'mdbreact';
import { SaveOutlined } from '@ant-design/icons';

export const ChangePasswordForm = ({
  handleSubmit,
  disable = false,
  password = '',
  password2 = '',
  setPassword,
  setPassword2,
}) => {

  const handlePasswordInputChange = useCallback(e => {
    setPassword(e.target.value);
  }, []);

  const handlePassword2InputChange = useCallback(e => {
    setPassword2(e.target.value);
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <MDBInput
          disabled={disable}
          label="New password"
          type="password"
          value={password}
          onChange={handlePasswordInputChange}
          autoFocus
          required
        />
        <MDBInput
          disabled={disable}
          label="New password confirmation"
          type="password"
          value={password2}
          onChange={handlePassword2InputChange}
          required
        />
        <MDBBtn
          disabled={password.length < 6 || password2.length < 6 || disable}
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
