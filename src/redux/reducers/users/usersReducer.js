import { GET_USERS_SUCCESS } from 'actions/users/usersActions';

const initialState = { users: [] };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
