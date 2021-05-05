import axios from 'axios';

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
