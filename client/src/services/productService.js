import axios from 'axios';
import { toast } from 'react-toastify';

export const getProducts = () =>
  axios.get(`${process.env.REACT_APP_API_BASE_LINK}/products`);

export const getProduct = slug =>
  axios.get(`${process.env.REACT_APP_API_BASE_LINK}/product/${slug}`);

export const removeProduct = (slug, authtoken) =>
  axios.delete(
    `${process.env.REACT_APP_API_BASE_LINK}/product/${slug}`,
    { headers: { authtoken } },
  );

export const createProduct = (product, authtoken) =>
  axios.post(
    `${process.env.REACT_APP_API_BASE_LINK}/product`,
    product,
    { headers: { authtoken } },
  );

export const updateProduct = (slug, product, authtoken) =>
  axios.patch(
    `${process.env.REACT_APP_API_BASE_LINK}/product/${slug}`,
    product,
    { headers: { authtoken } },
  );

export const loadProducts = (setLoading, setProducts) => {
  setLoading(true);
  getProducts()
    .then(response => {
      setProducts(response.data);
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
