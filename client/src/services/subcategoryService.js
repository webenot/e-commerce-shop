import axios from 'axios';
import { toast } from 'react-toastify';

export const getSubs = () =>
  axios.get(`${process.env.REACT_APP_API_BASE_LINK}/subs`);

export const getSub = slug =>
  axios.get(`${process.env.REACT_APP_API_BASE_LINK}/sub/${slug}`);

export const removeSub = (slug, authtoken) =>
  axios.delete(
    `${process.env.REACT_APP_API_BASE_LINK}/sub/${slug}`,
    { headers: { authtoken } },
  );

export const createSub = (sub, authtoken) =>
  axios.post(
    `${process.env.REACT_APP_API_BASE_LINK}/sub`,
    sub,
    { headers: { authtoken } },
  );

export const updateSub = (slug, sub, authtoken) =>
  axios.patch(
    `${process.env.REACT_APP_API_BASE_LINK}/sub/${slug}`,
    sub,
    { headers: { authtoken } },
  );

export const loadSubcategories = (setLoading, setSubcategories) => {
  setLoading(true);
  getSubs()
    .then(response => {
      setSubcategories(response.data);
    })
    .catch(error => {
      if (error.response && error.response.status === 500) {
        toast.error(error.response.data);
      } else {
        toast.error(error.message);
      }
    })
    .finally(() => setLoading(false));
};
