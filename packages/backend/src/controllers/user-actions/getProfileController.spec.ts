import 'mocha'
import chai from 'chai'
import { AuthCredentials } from '../../interfaces'
import { addUser, loginUser, destroyUser, getProfile } from '../../test-utils'

const { expect } = chai

const validCreds: AuthCredentials = {
  name: 'Dummy Example',
  email: 'dummy@example.com',
  password: 'password1'
}

let token: string

describe('Get Profile Controller', () => {
  before('setup', async () => {
    await addUser(validCreds)

    await loginUser(validCreds).then(res => {
      token = res.body.data
    })
  })

  after('cleanup', async () => {
    await destroyUser(validCreds.email)
  })

  describe('validations', () => {
    it('should handle no authorization token', done => {
      getProfile().then(res => {
        expect(res.status).to.equal(401)
        done()
      })
    })

    it('should handle invalid token', done => {
      getProfile(`${token}S`).then(res => {
        expect(res.status).to.equal(401)
        done()
      })
    })
  })

  it('should return a user profile successfully', done => {
    getProfile(token).then(res => {
      expect(res.status).to.equal(200)
      expect(res.body.message).to.equal('profile successfully retrieved')
      expect(res.body.data.name).to.equal(validCreds.name)
      done()
    })
  })
})
