import React from 'react';

import { ForgotPasswordForm } from 'Components/form/ForgotPasswordForm';
import { AuthBaseTemplate } from 'Pages/auth/index';

export const ForgotPassword = () => (
  <AuthBaseTemplate>
    <ForgotPasswordForm />
  </AuthBaseTemplate>
);
