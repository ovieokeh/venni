import 'mocha'
import chai from 'chai'
import chaiHttp from 'chai-http'
import { AuthCredentials } from '../../interfaces'
import { addUser, loginUser, destroyUser } from '../../test-utils'
import server from '../../app'

const { expect } = chai
chai.use(chaiHttp)

const validCreds: AuthCredentials = {
  name: 'Dummy Example',
  email: 'dummy@example.com',
  password: 'password1'
}

let token: string

describe('Map Socket to ID', () => {
  before('setup', async () => {
    await addUser(validCreds)

    await loginUser(validCreds).then(res => {
      token = res.body.data
    })
  })

  after('cleanup', async () => {
    await destroyUser(validCreds.email)
  })

  it('should map a socketid to user successfully', done => {
    chai
      .request(server)
      .get(`/sockets/${validCreds.email}`)
      .set('authorization', token)
      .end((_, res) => {
        expect(res.status).to.equal(204)
        done()
      })
  })
})
