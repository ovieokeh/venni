import Axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export const NEW_FRIEND_INVITE = 'NEW_FRIEND_INVITE';
export const NEW_SENT_INVITE = 'NEW_SENT_INVITE';
export const CANCELED_SENT_INVITE = 'CANCELED_SENT_INVITE';
export const DECLINED_SENT_INVITE = 'DECLINED_SENT_INVITE';
export const ACCEPTED_SENT_INVITE = 'ACCEPTED_SENT_INVITE';
export const DECLINED_INVITE = 'DECLINED_INVITE';
export const CANCELED_INVITE = 'CANCELED_INVITE';
export const ACCEPTED_INVITE = 'ACCEPTED_INVITE';
export const UNFRIEND = 'UNFRIEND';

export const sendFriendInvite = email => async (_, getState) => {
  const url = `${process.env.API_URL}/invites/${email}`;
  const { token } = getState().auth;

  return Axios.put(url, undefined, { headers: { token } })
    .then(response => response.data.message)
    .catch(error => Promise.reject(new Error(error.response.data.message)));
};

export const unfriendUserRequest = email => async (_, getState) => {
  const url = `${process.env.API_URL}/friends/${email}`;
  const { token } = getState().auth;

  return Axios.delete(url, { headers: { token } })
    .then(response => response.data.message)
    .catch(error => Promise.reject(new Error(error.response.data.message)));
};

export const cancelFriendInvite = email => async (_, getState) => {
  const url = `${process.env.API_URL}/invites/${email}`;
  const { token } = getState().auth;

  return Axios.delete(url, { headers: { token } })
    .then(() => true)
    .catch(() => { /* do nothing */ });
};


export const friendInviteAction = (id, action) => async (_, getState) => {
  const url = `${process.env.API_URL}/invites/${id}/actions`;
  const { token } = getState().auth;

  if (action === 'accept') {
    return Axios.put(url, undefined, { headers: { token } })
      .then(() => true)
      .catch(() => { /* do nothing */ });
  }

  return Axios.delete(url, { headers: { token } })
    .then(() => true)
    .catch(() => { /* do nothing */ });
};

export const newFriendInvite = invite => ({
  type: NEW_FRIEND_INVITE,
  payload: invite,
});

export const newSentInvite = invite => ({
  type: NEW_SENT_INVITE,
  payload: invite,
});

export const handledInvite = (type, inviteId) => ({
  type, payload: inviteId,
});

export const handledSentInvite = (type, inviteId) => ({
  type, payload: inviteId,
});

export const unfriend = friendId => ({
  type: UNFRIEND,
  payload: friendId,
});
