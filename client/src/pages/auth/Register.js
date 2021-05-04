import React from 'react';

import { RegisterForm } from 'Components/form/RegisterForm';
import { AuthBaseTemplate } from 'Pages/auth/index';

export const Register = () => (
  <AuthBaseTemplate>
    <RegisterForm />
  </AuthBaseTemplate>
);
