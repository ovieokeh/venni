import { GET_PROFILE_SUCCESS } from 'actions/profile/profileActions';

let initialState;

try {
  const remember = localStorage.getItem('remember');
  /* istanbul ignore next */
  initialState = remember === 'yes'
    ? JSON.parse(localStorage.getItem('store')).user
    : initialState = {
      profile: null,
    };
} catch (error) {
  /* istanbul ignore next */
  initialState = {
    profile: null,
  };
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
