import 'mocha'
import chai from 'chai'
import { AuthCredentials } from '../../interfaces'
import { TestUtils } from '../../utilities'

const { expect } = chai

const validCreds: AuthCredentials = {
  name: 'Dummy Example',
  email: 'dummy@example.com',
  password: 'password1'
}

let token: string

describe('Get Profile Controller', () => {
  before('setup', async () => {
    await TestUtils.addUser(validCreds)

    await TestUtils.loginUser(validCreds).then(res => {
      token = res.body.data
    })
  })

  after('cleanup', async () => {
    await TestUtils.destroyUser(validCreds.email)
  })

  describe('validations', () => {
    it('should handle no authorization token', done => {
      TestUtils.getProfile().then(res => {
        expect(res.status).to.equal(401)
        done()
      })
    })

    it('should handle invalid token', done => {
      TestUtils.getProfile(`${token}S`).then(res => {
        expect(res.status).to.equal(401)
        done()
      })
    })
  })

  it('should return a user profile successfully', done => {
    TestUtils.getProfile(token).then(res => {
      expect(res.status).to.equal(200)
      expect(res.body.message).to.equal('profile successfully retrieved')
      expect(res.body.data.name).to.equal(validCreds.name)
      done()
    })
  })
})
