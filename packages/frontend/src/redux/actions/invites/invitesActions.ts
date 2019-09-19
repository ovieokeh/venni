import axios from 'axios'
import { Dispatch } from 'redux'
import {
  GET_INVITES_SUCCESS,
  NEW_RECEIVED_INVITE,
  NEW_SENT_INVITE,
  UNFRIEND,
  AllInvites,
  Invite
} from '../../types'

export const getInvitesSuccess = (allInvites: AllInvites) => ({
  type: GET_INVITES_SUCCESS,
  allInvites
})

export const newFriendInvite = (invite: Invite) => ({
  type: NEW_RECEIVED_INVITE,
  invite
})

export const newSentInvite = (invite: Invite) => ({
  type: NEW_SENT_INVITE,
  invite
})

export const handledInvite = (type: string, inviteId: string) => ({
  type,
  inviteId
})

export const handledSentInvite = (type: string, inviteId: string) => ({
  type,
  inviteId
})

export const unfriend = (friendId: string) => ({
  type: UNFRIEND,
  id: friendId
})

export const getAllInvites = () => (dispatch: Dispatch, getState: Function) => {
  const url = `${process.env.REACT_APP_API_URL}invites/`
  const { token } = getState().auth

  return axios
    .get(url, { headers: { authorization: token } })
    .then(res => {
      dispatch(getInvitesSuccess(res.data.data))
    })
    .catch(err => err.response.data.message)
}

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
