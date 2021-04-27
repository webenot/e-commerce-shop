import axios from 'axios';

export const createOrUpdateUser = authtoken => axios.post(
  `${process.env.REACT_APP_API_BASE_LINK}/create-or-update-user`,
  {},
  { headers: { authtoken } },
);
