import axios from 'axios'
import { Dispatch } from 'redux'
import { NEW_FRIEND_INVITE, NEW_SENT_INVITE, UNFRIEND } from '../../types'

export const newFriendInvite = (invite: string) => ({
  type: NEW_FRIEND_INVITE,
  payload: invite
})

export const newSentInvite = (invite: string) => ({
  type: NEW_SENT_INVITE,
  payload: invite
})

export const handledInvite = (type: string, inviteId: string) => ({
  type,
  payload: inviteId
})

export const handledSentInvite = (type: string, inviteId: string) => ({
  type,
  payload: inviteId
})

export const unfriend = (friendId: string) => ({
  type: UNFRIEND,
  payload: friendId
})

export const sendFriendInvite = (email: string) => (
  _: Dispatch,
  getState: Function
) => {
  const url = `${process.env.REACT_APP_API_URL}invites/${email}`
  const { token } = getState().auth

  return axios
    .put(url, undefined, { headers: { authorization: token } })
    .then(res => res.data.message)
    .catch(err => {
      throw new Error(err.response.data.message)
    })
}

export const unfriendUserRequest = (email: string) => (
  _: Dispatch,
  getState: Function
) => {
  const url = `${process.env.REACT_APP_API_URL}friends/${email}`
  const { token } = getState().auth

  return axios
    .delete(url, { headers: { authorization: token } })
    .then(response => response.data.message)
    .catch(error => new Error(error.response.data.message))
}

export const cancelFriendInvite = (email: string) => async (
  _: Dispatch,
  getState: Function
) => {
  const url = `${process.env.REACT_APP_API_URL}invites/${email}`
  const { token } = getState().auth

  return axios
    .delete(url, { headers: { authorization: token } })
    .then(() => true)
    .catch(() => {
      /* do nothing */
    })
}

export const friendInviteAction = (id: string, action: string) => async (
  _: Dispatch,
  getState: Function
) => {
  const url = `${process.env.REACT_APP_API_URL}invites/${id}/actions`
  const { token } = getState().auth

  if (action === 'accept') {
    return axios
      .put(url, undefined, { headers: { authorization: token } })
      .then(() => true)
      .catch(() => {
        /* do nothing */
      })
  }

  return axios
    .delete(url, { headers: { authorization: token } })
    .then(() => true)
    .catch(() => {
      /* do nothing */
    })
}
