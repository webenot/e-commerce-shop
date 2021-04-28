import axios from 'axios';

export const currentUser = authtoken => axios.post(
  `${process.env.REACT_APP_API_BASE_LINK}/current-user`,
  {},
  { headers: { authtoken } },
);
