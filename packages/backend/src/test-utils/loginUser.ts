import request from 'superagent'
import chai from 'chai'
import chaiHttp from 'chai-http'
import server from '../app'
import { AuthCredentials } from '../interfaces'

chai.use(chaiHttp)

async function loginUser(userCred?: AuthCredentials): Promise<request.Response> {
  return chai
    .request(server)
    .post('/login')
    .send(userCred)
    .then(res => res)
}

export default loginUser
