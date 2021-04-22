import React, { useState, useCallback } from 'react';
import { MDBInput, MDBBtn } from 'mdbreact';

export const RegisterForm = () => {
  const [ email, setEmail ] = useState('');

  const handleSubmit = useCallback(() => {
    //
  }, []);

  const handleInputChange = useCallback(e => {
    setEmail(e.target.value);
  }, []);

  return (
    <form onSubmit={handleSubmit()}>
      <MDBInput
        label="Email"
        type="email"
        value={email}
        onChange={handleInputChange}
        autoFocus
        color="teal"
      />
      <MDBBtn className="button-raised" type="submit">Register / {email}</MDBBtn>
    </form>
  );
};
