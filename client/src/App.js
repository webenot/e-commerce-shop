import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { Login } from 'Pages/auth/Login';
import { Register } from 'Pages/auth/Register';
import { RegisterComplete } from 'Pages/auth/RegisterComplete';
import { ForgotPassword } from 'Pages/auth/ForgotPassword';
import { Home } from 'Pages/Home';
import { Header } from 'Components/nav/Header';
import { auth } from 'App/firebase';
import { LOGGED_IN_USER } from 'Reducers/userReducer';
import { currentUser } from 'Services/currentUser';

import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const dispatch = useDispatch();

  // Check firebase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async user => {
      if (user) {
        try {
          const idTokenResult = await user.getIdTokenResult();
          const response = await currentUser(idTokenResult.token);
          if (response && response.data) {
            dispatch({
              type: LOGGED_IN_USER,
              payload: {
                name: response.data.name,
                email: response.data.email,
                token: idTokenResult.token,
                picture: response.data.picture,
                role: response.data.role,
                _id: response.data._id,
              },
            });
          }
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
        <Route exact path="/forgot/password" component={ForgotPassword} />
      </Switch>
      <ToastContainer
        position="bottom-right"
      />
    </>
  );
};
