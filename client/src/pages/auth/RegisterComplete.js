import React from 'react';

import { RegisterCompleteForm } from 'Components/forms/RegisterCompleteForm';
import { AuthBaseTemplate } from 'Pages/auth';

export const RegisterComplete = () => (
  <AuthBaseTemplate>
    <RegisterCompleteForm />
  </AuthBaseTemplate>
);
