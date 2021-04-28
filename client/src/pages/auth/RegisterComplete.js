import React, { useState } from 'react';

import { RegisterCompleteForm } from 'Components/form/RegisterCompleteForm';
import { REGISTER_COMPLETE_TITLE } from 'App/config';
import { AuthBaseTemplate } from 'Pages/auth';

export const RegisterComplete = () => {
  const [ title, setTitle ] = useState(REGISTER_COMPLETE_TITLE);
  return (
    <AuthBaseTemplate title={title}>
      <RegisterCompleteForm setTitle={setTitle} />
    </AuthBaseTemplate>
  );
};
