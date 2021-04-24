import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Login } from 'Pages/auth/Login';
import { Register } from 'Pages/auth/Register';
import { RegisterComplete } from 'Pages/auth/RegisterComplete';
import { Home } from 'Pages/Home';
import { Header } from 'Components/nav/Header';

import 'react-toastify/dist/ReactToastify.css';

export const App = () => (
  <>
    <Header />
    <ToastContainer />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/register/complete" component={RegisterComplete} />
    </Switch>
  </>
);
