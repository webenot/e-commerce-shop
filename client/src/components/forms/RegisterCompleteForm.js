import React, { useCallback } from 'react';
import { MDBInput, MDBBtn } from 'mdbreact';
import 'react-toastify/dist/ReactToastify.css';
import { UserAddOutlined } from '@ant-design/icons';

export const RegisterCompleteForm = ({
  handleSubmit,
  loading = false,
  email = '',
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
    <form onSubmit={handleSubmit}>
      <MDBInput
        label="Email"
        type="email"
        value={email}
        disabled
        required
      />
      <MDBInput
        disabled={loading}
        label="Password"
        type="password"
        value={password}
        onChange={handlePasswordInputChange}
        autoFocus
        required
      />
      <MDBInput
        disabled={loading}
        label="Password confirmation"
        type="password"
        value={password2}
        onChange={handlePassword2InputChange}
        required
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
