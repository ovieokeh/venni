import { LOGIN_SUCCESS, SIGNUP_SUCCESS, LOGOUT } from 'actions/authentication/authActions';

let initialState;

try {
  const remember = localStorage.getItem('remember');
  /* istanbul ignore next */
  initialState = remember === 'yes'
    ? JSON.parse(localStorage.getItem('store')).auth
    : initialState = { token: null };
} catch (error) {
  /* istanbul ignore next */
  initialState = { token: null };
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload,
      };

    case LOGOUT:
      return {
        ...state,
        token: null,
      };

    default:
      return state;
  }
};

export default reducer;
