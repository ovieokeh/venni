import io from 'socket.io-client'
import { context } from 'src/utilities'
import onSocket from './onSocket'
import onNewReceivedInvite from './onNewReceivedInvite'
import onNewSentInvite from './onNewSentInvite'
import onHandledSentInvite from './onHandledSentInvite'
import onHandledReceivedInvite from './onHandledReceivedInvite'
import onUnfriend from './onUnfriend'

function setupSockets(token: string) {
  context.socket = io(process.env.REACT_APP_SOCKETS_URL as string)
  const { socket } = context

  context.socket.on('connect', () => {
    socket.emit('authentication', token)
    socket.on('socket', onSocket(token))

    socket.on('authenticated', () => {
      socket.on('newReceivedInvite', onNewReceivedInvite)
      socket.on('newSentInvite', onNewSentInvite)
      socket.on('handledSentInvite', onHandledSentInvite)
      socket.on('handledReceivedInvite', onHandledReceivedInvite)
      socket.on('unfriend', onUnfriend)
    })
  })
}

export default setupSockets
