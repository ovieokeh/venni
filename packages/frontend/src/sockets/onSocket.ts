import axios from 'axios'

function onSocket(token: string) {
  return (socketId: string) => {
    const url = `${process.env.REACT_APP_API_URL}/sockets/${socketId}`
    return axios.get(url, { headers: { authorization: token } })
  }
}

export default onSocket
