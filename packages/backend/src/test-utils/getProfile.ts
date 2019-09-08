import request from 'superagent'
import chai from 'chai'
import chaiHttp from 'chai-http'
import server from '../app'

chai.use(chaiHttp)

async function getProfile(token?: string): Promise<request.Response> {
  return chai
    .request(server)
    .get('/profile')
    .set('authorization', token || '')
    .then(res => res)
}

export default getProfile
