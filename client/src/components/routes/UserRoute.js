import React from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { LoadingToRedirect } from 'Routes/LoadingToRedirect';

export const UserRoute = ({ ...rest }) => {
  const { user } = useSelector(state => state);
  return user && user.token ?
    (<Route {...rest} />) :
    (<LoadingToRedirect />);
};
