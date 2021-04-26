import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { LoginForm } from 'Components/form/LoginForm';
import { LOGIN_TITLE } from 'App/config';
import { AuthBaseTemplate } from 'Pages/auth/index';

export const Login = () => {
  const [ title, setTitle ] = useState(LOGIN_TITLE);
  return (
    <AuthBaseTemplate title={title}>
      <LoginForm setTitle={setTitle} />
      <br />
      <Link to="/forgot/password" className="float-right text-danger">Forgot your password?</Link>
    </AuthBaseTemplate>
  );
};
