import request from 'superagent'
import chai from 'chai'
import chaiHttp from 'chai-http'
import server from '../app'

chai.use(chaiHttp)

async function sendInvite(to: string, token?: string): Promise<request.Response> {
  return chai
    .request(server)
    .put(`/invites/${to}`)
    .set('authorization', token || '')
    .then(res => res)
}

export default sendInvite
