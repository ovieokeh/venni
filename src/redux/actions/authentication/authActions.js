import Axios from 'axios';
import dotenv from 'dotenv';
import {
  loaderBegin, loaderDone, notifyError, notifySuccess,
} from 'actions/loader/loaderActions';

dotenv.config();

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const LOGOUT = 'LOGOUT';

export const loginSuccess = token => ({
  type: LOGIN_SUCCESS,
  payload: token,
});

export const signupSuccess = token => ({
  type: SIGNUP_SUCCESS,
  payload: token,
});

export const logoutAction = () => ({ type: LOGOUT });

export const loginRequest = user => (dispatch) => {
  const url = `${process.env.API_URL}/login`;
  dispatch(loaderBegin());

  return Axios.post(url, user)
    .then((response) => {
      dispatch(loginSuccess(response.data.data));
      dispatch(loaderDone());
      return true;
    })
    .catch((error) => {
      dispatch(loaderDone());
      dispatch(notifyError(error.response.data.message));
    });
};

export const signupRequest = user => (dispatch) => {
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
