import React, { useCallback } from 'react';
import { MDBInput, MDBBtn } from 'mdbreact';
import { MailOutlined } from '@ant-design/icons';

export const LoginForm = ({
  handleSubmit,
  disable = false,
  email = '',
  password = '',
  setEmail,
  setPassword,
}) => {
  const handleEmailChange = useCallback(e => {
    setEmail(e.target.value);
  }, []);

  const handlePasswordChange = useCallback(e => {
    setPassword(e.target.value);
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <MDBInput
        disabled={disable}
        label="Email"
        type="email"
        value={email}
        onChange={handleEmailChange}
        autoFocus
        required
      />
      <MDBInput
        disabled={disable}
        label="Password"
        type="password"
        value={password}
        onChange={handlePasswordChange}
        required
      />
      <MDBBtn
        disabled={!email || password.length < 6 || disable}
        color="primary"
        className="btn-rounded btn-block"
        type="submit"
        tabIndex="1"
      >
        <MailOutlined />
        <span>Login with Email/Password</span>
      </MDBBtn>
    </form>
  );
};
