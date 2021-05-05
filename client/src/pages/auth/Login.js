import React from 'react';
import { Link } from 'react-router-dom';

import { LoginForm } from 'Components/forms/LoginForm';
import { AuthBaseTemplate } from 'Pages/auth/index';

export const Login = () => (
  <AuthBaseTemplate>
    <LoginForm />
    <br />
    <Link to="/forgot/password" className="float-right text-danger">Forgot your password?</Link>
  </AuthBaseTemplate>
);
