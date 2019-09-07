import request from 'superagent'
import chai from 'chai'
import chaiHttp from 'chai-http'
import server from '../app'
import { AuthCredentials } from '../interfaces'

chai.use(chaiHttp)

async function addUser(userCred?: AuthCredentials): Promise<request.Response> {
  return chai
    .request(server)
    .post('/signup')
    .send(userCred)
    .then(res => res)
}

export default addUser
