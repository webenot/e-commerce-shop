import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { Login } from 'Pages/auth/Login';
import { Register } from 'Pages/auth/Register';
import { RegisterComplete } from 'Pages/auth/RegisterComplete';
import { Home } from 'Pages/Home';
import { Header } from 'Components/nav/Header';
import { auth } from 'App/firebase';
import { LOGGED_IN_USER } from 'Reducers/userReducer';

import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const dispatch = useDispatch();

  // Check firebase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async user => {
      if (user) {
        try {
          const idTokenResult = await user.getIdTokenResult();
          dispatch({
            type: LOGGED_IN_USER,
            payload: {
              name: user.displayName,
              email: user.email,
              token: idTokenResult.token,
              image: user.photoURL,
            },
          });
        } catch (e) {
          console.error(e);
          toast.error(e.message);
        }
      }
    });
    return () => unsubscribe();
  }, []);
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/complete" component={RegisterComplete} />
      </Switch>
      <ToastContainer
        position="bottom-right"
      />
    </>
  );
};
