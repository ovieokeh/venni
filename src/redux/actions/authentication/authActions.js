import Axios from 'axios';
import dotenv from 'dotenv';
import {
  loaderBegin, loaderDone, notifyError, notifySuccess,
} from 'actions/loader/loaderActions';
import { getProfileRequest } from 'actions/profile/profileActions';

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

export const loginRequest = user => async (dispatch) => {
  const url = `${process.env.API_URL}/login`;
  dispatch(loaderBegin());

  try {
    const success = await Axios.post(url, user);

    dispatch(loginSuccess(success.data.data));
    await dispatch(getProfileRequest());
    dispatch(loaderDone());
    return true;
  } catch (error) {
    dispatch(loaderDone());
    dispatch(notifyError(error.response.data.message));
  }

  return false;
};

export const signupRequest = user => async (dispatch) => {
  const url = `${process.env.API_URL}/signup`;
  dispatch(loaderBegin());

  try {
    const success = await Axios.post(url, user);

    dispatch(signupSuccess(success.data.data));
    await dispatch(getProfileRequest());
    dispatch(loaderDone());
    dispatch(notifySuccess(success.data.message));
    return true;
  } catch (error) {
    dispatch(loaderDone());
    dispatch(notifyError(error.response.data.message));
  }

  return false;
};
