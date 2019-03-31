import store from '../redux/store';

const isLoggedIn = () => {
  if (store.getState().auth.token) {
    return true;
  }

  return false;
};

export default isLoggedIn;
