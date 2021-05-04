import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { LoadingToRedirect } from 'Routes/LoadingToRedirect';
import { currentAdmin } from 'Services/authService';

export const AdminRoute = ({ ...rest }) => {
  const { user } = useSelector(state => state);
  const [ ok, setOk ] = useState(false);
  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then(() => {
          setOk(true);
        })
        .catch(error => {
          console.error(error);
          toast.error(error.message);
          setOk(false);
        });
    }
  }, [ user ]);

  return ok ?
    (<Route {...rest} />) :
    (<LoadingToRedirect />);
};
