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
import { History } from 'Pages/user/History';
import { Password } from 'Pages/user/Password';
import { Wishlist } from 'Pages/user/Wishlist';
import { AdminDashboard } from 'Pages/admin/AdminDashboard';
import { CategoryCreate } from 'Pages/admin/category/CategoryCreate';
import { CategoryEdit } from 'Pages/admin/category/CategoryEdit';
import { SubcategoryCreate } from 'Pages/admin/sub/SubcategoryCreate';
import { SubcategoryEdit } from 'Pages/admin/sub/SubcategoryEdit';
import { Header } from 'Components/nav/Header';
import { auth } from 'App/firebase';
import { LOGGED_IN_USER } from 'Reducers/userReducer';
import { currentUser } from 'Services/authService';
import { UserRoute } from 'Components/routes/UserRoute';
import { AdminRoute } from 'Components/routes/AdminRoute';

import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const dispatch = useDispatch();

  // Check firebase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async user => {
      console.log({ user });
      if (user) {
        dispatch({
          type: LOGGED_IN_USER,
          payload: {
            name: user.displayName,
            email: user.email,
            token: user.za,
          },
        });
        try {
          const idTokenResult = await user.getIdTokenResult();
          dispatch({
            type: LOGGED_IN_USER,
            payload: {
              name: user.displayName,
              email: user.email,
              token: idTokenResult.token,
            },
          });
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
        <UserRoute exact path="/user/history" component={History} />
        <UserRoute exact path="/user/password" component={Password} />
        <UserRoute exact path="/user/wishlist" component={Wishlist} />
        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
        <AdminRoute exact path="/admin/category" component={CategoryCreate} />
        <AdminRoute exact path="/admin/category/:slug" component={CategoryEdit} />
        <AdminRoute exact path="/admin/sub" component={SubcategoryCreate} />
        <AdminRoute exact path="/admin/sub/:slug" component={SubcategoryEdit} />
      </Switch>
      <ToastContainer
        position="bottom-right"
      />
    </>
  );
};
