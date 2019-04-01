import Axios from 'axios';
import dotenv from 'dotenv';
import {
  loaderBegin, loaderDone,
  notifyError, notifySuccess,
} from 'actions/loader/loaderActions';

dotenv.config();

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';

export const loginSuccess = token => ({
  type: LOGIN_SUCCESS,
  payload: token,
});

export const signupSuccess = token => ({
  type: SIGNUP_SUCCESS,
  payload: token,
});

export const loginRequest = user => async (dispatch) => {
  const url = `${process.env.API_URL}/login`;
  dispatch(loaderBegin());

  return Axios.post(url, user)
    .then((response) => {
      dispatch(loginSuccess(response.data.data));
      dispatch(loaderDone());
      dispatch(notifySuccess(response.data.message));
      // console.log(response);
      return true;
    })
    .catch((error) => {
      dispatch(loaderDone());
      dispatch(notifyError(error.response.data.message));
    });
};

export const signupRequest = user => async (dispatch) => {
  const url = `${process.env.API_URL}/signup`;
  dispatch(loaderBegin());

  return Axios.post(url, user)
    .then((response) => {
      dispatch(signupSuccess(response.data.data));
      dispatch(loaderDone());
      dispatch(notifySuccess(response.data.message));

      return true;
    })
    .catch((error) => {
      dispatch(loaderDone());
      dispatch(notifyError(error.response.data.message));
    });
};
