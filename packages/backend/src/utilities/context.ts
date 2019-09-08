import { Server } from 'socket.io'

interface Context {
  connectedClients: { [x: string]: string }
  socket: Server
}

const context: Context = {
  connectedClients: {},
  socket: null
}

export default context
