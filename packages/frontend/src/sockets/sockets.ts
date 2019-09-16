import axios from 'axios'
import io from 'socket.io-client'
import store from 'src/redux/store'
import * as actions from 'src/redux/actions/invites/invitesActions'
import * as types from 'src/redux/types'
import { context } from 'src/utilities'

function setupSockets(token: string) {
  context.socket = io(process.env.REACT_APP_SOCKETS_URL as string)
  const { socket } = context

  context.socket.on('connect', () => {
    socket.emit('authentication', token)

    socket.on('socket', async (socketId: string) => {
      const url = `${process.env.REACT_APP_API_URL}/sockets/${socketId}`
      await axios.get(url, { headers: { authorization: token } })
    })

    socket.on('authenticated', () => {
      socket.on('newReceivedInvite', (inviteDetails: string) => {
        store.dispatch(actions.newFriendInvite(inviteDetails))
      })

      socket.on('newSentInvite', (inviteDetails: string) => {
        store.dispatch(actions.newSentInvite(inviteDetails))
      })

      socket.on('handledSentInvite', (details: any) => {
        const { action, inviteId, friend } = details
        let payload = inviteId
        let type

        switch (action) {
          case 'canceled':
            type = types.CANCELED_SENT_INVITE
            break

          case 'declined':
            type = types.DECLINED_SENT_INVITE
            break

          default:
            type = types.ACCEPTED_SENT_INVITE
            payload = friend
        }

        store.dispatch(actions.handledSentInvite(type, payload))
      })

      socket.on('handledInvite', (details: any) => {
        const { action, inviteId, friend } = details
        let payload = inviteId
        let type

        switch (action) {
          case 'canceled':
            type = types.CANCELED_INVITE
            break

          case 'declined':
            type = types.DECLINED_INVITE
            break

          default:
            type = types.ACCEPTED_INVITE
            payload = friend
        }

        store.dispatch(actions.handledInvite(type, payload))
      })

      socket.on('unfriend', (friendId: string) => {
        store.dispatch(actions.unfriend(friendId))
      })
    })
  })
}

export default setupSockets
