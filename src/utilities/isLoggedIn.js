import store from 'store/store';

const isLoggedIn = () => !!store.getState().auth.token;

export default isLoggedIn;
