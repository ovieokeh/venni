import Axios from 'axios';
import dotenv from 'dotenv';
import { getProfileRequest } from 'actions/profile/profileActions';

dotenv.config();

export const sendFriendRequest = friendId => async (dispatch, getState) => {
  const url = `${process.env.API_URL}/requests/${friendId}`;
  const { token } = getState().auth;

  return Axios.put(url, undefined, { headers: { token } })
    .then(async () => {
      await dispatch(getProfileRequest());
      return true;
    })
    .catch(() => { /* do nothing */ });
};

export const unfriendUserRequest = friendId => async (dispatch, getState) => {
  const url = `${process.env.API_URL}/friends/${friendId}`;
  const { token } = getState().auth;

  return Axios.delete(url, { headers: { token } })
    .then(async () => {
      await dispatch(getProfileRequest());
      return true;
    })
    .catch(() => { /* do nothing */ });
};

export const cancelFriendRequest = friendId => async (dispatch, getState) => {
  const url = `${process.env.API_URL}/requests/${friendId}`;
  const { token } = getState().auth;

  return Axios.delete(url, { headers: { token } })
    .then(async () => {
      await dispatch(getProfileRequest());
      return true;
    })
    .catch(() => { /* do nothing */ });
};


export const friendRequestAction = (id, action) => async (dispatch, getState) => {
  const url = `${process.env.API_URL}/requests/${id}/actions`;
  const { token } = getState().auth;

  if (action === 'accept') {
    return Axios.put(url, undefined, { headers: { token } })
      .then(() => { dispatch(getProfileRequest()); })
      .catch(() => { /* do nothing */ });
  }

  return Axios.delete(url, { headers: { token } })
    .then(() => dispatch(getProfileRequest()))
    .catch(() => { /* do nothing */ });
};
