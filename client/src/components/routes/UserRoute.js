import React from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { LoadingToRedirect } from 'Routes/LoadingToRedirect';

export const UserRoute = ({
  children,
  ...rest
}) => {
  const { user } = useSelector(state => state);
  return user && user.token ?
    (<Route {...rest} render={() => children} />) :
    (<LoadingToRedirect />);
};
