import Axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';

export const getUsersSuccess = users => ({
  type: GET_USERS_SUCCESS,
  payload: users,
});

export const getUsersRequest = () => async (dispatch, getState) => {
  const url = `${process.env.API_URL}/users`;
  const { token } = getState().auth;

  return Axios.get(url, { headers: { token } })
    .then((response) => {
      dispatch(getUsersSuccess(response.data.data));
      return true;
    })
    .catch(() => { /* do nothing */ });
};
