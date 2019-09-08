import request from 'superagent'
import chai from 'chai'
import chaiHttp from 'chai-http'
import { UserModel } from '../database/models/User'
import server from '../app'
import { AuthCredentials } from '../interfaces'

chai.use(chaiHttp)

class TestUtils {
  static async addUser(userCred?: AuthCredentials): Promise<request.Response> {
    return chai
      .request(server)
      .post('/signup')
      .send(userCred)
      .then(res => res)
  }

  static async destroyUser(email: string): Promise<void> {
    await UserModel.destroy({ where: { email } })
  }

  static async getProfile(token?: string): Promise<request.Response> {
    return chai
      .request(server)
      .get('/profile')
      .set('authorization', token || '')
      .then(res => res)
  }

  static async loginUser(userCred?: AuthCredentials): Promise<request.Response> {
    return chai
      .request(server)
      .post('/login')
      .send(userCred)
      .then(res => res)
  }

  static async sendInvite(to: string, token?: string): Promise<request.Response> {
    return chai
      .request(server)
      .put(`/invites/${to}`)
      .set('authorization', token || '')
      .then(res => res)
  }

  static async cancelInvite(to: string, token?: string): Promise<request.Response> {
    return chai
      .request(server)
      .delete(`/invites/${to}`)
      .set('authorization', token || '')
      .then(res => res)
  }
}

export default TestUtils
