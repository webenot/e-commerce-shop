import axios from 'axios';
import { toast } from 'react-toastify';

import { auth, googleAuthProvider } from 'App/firebase';
import { LOGGED_IN_USER } from 'Reducers/userReducer';

export const roleBasedRedirect = (response, history) => {
  if (response.data.role === 'admin') {
    history.push('/admin/dashboard');
  } else {
    history.push('/user/history');
  }
};

export const createOrUpdateUser = authtoken => axios.post(
  `${process.env.REACT_APP_API_BASE_LINK}/create-or-update-user`,
  {},
  { headers: { authtoken } },
);

export const authUser = async (strategy, setLoading, message, history, dispatch, ...args) => {
  setLoading(true);
  let result;
  try {
    switch (strategy) {
      case 'email':
        result = await auth.signInWithEmailAndPassword(...args);
        break;
      case 'google':
        result = await auth.signInWithPopup(googleAuthProvider);
        break;
      default:
        result = { user: null };
    }
    if (result.user) {
      const response = await createOrUpdateUser(result.user.za);
      if (response && response.data) {
        dispatch({
          type: LOGGED_IN_USER,
          payload: {
            name: response.data.name,
            email: response.data.email,
            token: result.user.za,
            picture: response.data.picture,
            role: response.data.role,
            _id: response.data._id,
          },
        });
        toast.success('Welcome');
        roleBasedRedirect(response, history);
      } else {
        toast.error(message);
        setLoading(false);
      }
    } else {
      toast.error(message);
      setLoading(false);
    }
  } catch (e) {
    console.error(e);
    toast.error(e.message);
    setLoading(false);
  }
};

export const currentUser = authtoken => axios.post(
  `${process.env.REACT_APP_API_BASE_LINK}/current-user`,
  {},
  { headers: { authtoken } },
);

export const currentAdmin = authtoken => axios.post(
  `${process.env.REACT_APP_API_BASE_LINK}/current-admin`,
  {},
  { headers: { authtoken } },
);
