export const roleBasedRedirect = (response, history) => {
  if (response.data.role === 'admin') {
    history.push('/admin/dashboard');
  } else {
    history.push('/user/history');
  }
};
