import React, { useState } from 'react';

import { ForgotPasswordForm } from 'Components/form/ForgotPasswordForm';
import { FORGOT_PASSWORD_TITLE } from 'App/config';
import { AuthBaseTemplate } from 'Pages/auth/index';

export const ForgotPassword = () => {
  const [ title, setTitle ] = useState(FORGOT_PASSWORD_TITLE);

  return (
    <AuthBaseTemplate title={title}>
      <ForgotPasswordForm setTitle={setTitle} />
    </AuthBaseTemplate>
  );
};
