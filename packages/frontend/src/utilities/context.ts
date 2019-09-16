interface Context {
  socket: SocketIOClient.Socket | null
}

const context: Context = {
  socket: null
}

export default context
