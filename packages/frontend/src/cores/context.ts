interface Context {
  socket: SocketIOClient.Socket | null
}

export const context: Context = {
  socket: null
}
