import React, { useCallback } from 'react';
import { MDBInput, MDBBtn } from 'mdbreact';
import { MailOutlined } from '@ant-design/icons';

export const ForgotPasswordForm = ({
  handleSubmit,
  disable = false,
  email = '',
  setEmail,
}) => {
  const handleInputChange = useCallback(e => {
    setEmail(e.target.value);
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <MDBInput
        disabled={disable}
        label="Email"
        type="email"
        value={email}
        onChange={handleInputChange}
        autoFocus
        required
      />
      <MDBBtn
        disabled={!email || email.indexOf('@') === -1 || email.indexOf('@') === email.length - 1 || disable}
        color="primary"
        className="btn-rounded btn-block"
        type="submit"
      >
        <MailOutlined />
        <span>Restore / {email}</span>
      </MDBBtn>
    </form>
  );
};
