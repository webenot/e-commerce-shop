import { toast } from 'react-toastify';

import { auth, googleAuthProvider } from 'App/firebase';
import { createOrUpdateUser } from 'Services/createOrUpdateUser';
import { LOGGED_IN_USER } from 'Reducers/userReducer';

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
        history.push('/dashboard');
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
