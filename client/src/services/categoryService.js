import axios from 'axios';
import { toast } from 'react-toastify';

export const getCategories = () =>
  axios.get(`${process.env.REACT_APP_API_BASE_LINK}/categories`);

export const getCategory = slug =>
  axios.get(`${process.env.REACT_APP_API_BASE_LINK}/category/${slug}`);

export const removeCategory = (slug, authtoken) =>
  axios.delete(
    `${process.env.REACT_APP_API_BASE_LINK}/category/${slug}`,
    { headers: { authtoken } },
  );

export const createCategory = (category, authtoken) =>
  axios.post(
    `${process.env.REACT_APP_API_BASE_LINK}/category`,
    category,
    { headers: { authtoken } },
  );

export const updateCategory = (slug, category, authtoken) =>
  axios.patch(
    `${process.env.REACT_APP_API_BASE_LINK}/category/${slug}`,
    category,
    { headers: { authtoken } },
  );

export const loadCategories = (setLoading, setCategories) => {
  setLoading(true);
  getCategories()
    .then(response => {
      setCategories(response.data);
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
