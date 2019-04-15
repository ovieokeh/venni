import Axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';

export const getProfileSuccess = profile => ({
  type: GET_PROFILE_SUCCESS,
  payload: profile,
});

export const getProfileRequest = () => async (dispatch, getState) => {
  const url = `${process.env.API_URL}/profile`;
  const { token } = getState().auth;

  return Axios.get(url, { headers: { token } })
    .then((response) => {
      dispatch(getProfileSuccess(response.data.data));
      return true;
    })
    .catch(() => { /* do nothing */ });
};
