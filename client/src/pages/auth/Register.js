import React, {  useState } from 'react';

import { REGISTER_TITLE } from 'App/config';
import { RegisterForm } from 'Components/form/RegisterForm';
import { AuthBaseTemplate } from 'Pages/auth/index';

export const Register = () => {
  const [ title, setTitle ] = useState(REGISTER_TITLE);
  return (
    <AuthBaseTemplate title={title}>
      <RegisterForm setTitle={setTitle} />
    </AuthBaseTemplate>
  );
};
