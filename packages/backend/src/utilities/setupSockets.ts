/* istanbul ignore next */
import io from 'socket.io'
import ioAuth from 'socketio-auth'
import context from './context'
import { getUserFromToken } from '../services'
import { Server } from 'http'

function setupSockets(server: Server): void {
  context.socket = io(server)

  ioAuth(context.socket, {
    authenticate: async (_, token, callback) => {
      try {
        await getUserFromToken(token)
        return callback(null, true)
      } catch (error) {
        return callback(error.message)
      }
    },
    postAuthenticate: async (client, token) => {
      const user = await getUserFromToken(token)
      client.client.user = user

      client.emit('socket', client.id)

      client.on('disconnect', () => {
        context.connectedClients[user.id] = null
      })
    }
  })
}

export default setupSockets
