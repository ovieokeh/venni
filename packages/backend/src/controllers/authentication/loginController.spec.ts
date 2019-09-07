import 'mocha'
import chai from 'chai'
import { AuthCredentials } from '../../interfaces'
import { addUser, loginUser, destroyUser } from '../../test-utils'

const { expect } = chai

const invalidCreds: AuthCredentials = {
  email: '1@1.c',
  password: 'password'
}

const validCreds: AuthCredentials = {
  name: 'Dummy Example',
  email: 'dummy@example.com',
  password: 'password1'
}

describe('Login Controller', () => {
  before('setup', async () => {
    await addUser(validCreds)
  })

  after('cleanup', async () => {
    await destroyUser(validCreds.email)
  })

  describe('validations', () => {
    it('should handle no credentials', done => {
      loginUser().then(res => {
        expect(res.status).to.equal(422)
        expect(res.body.message).to.equal('login unsuccessful')
        expect(res.body.data[0].msg).to.equal('email must be provided')
        expect(res.body.data[1].msg).to.equal('password must be provided')
        done()
      })
    })

    it('should handle invalid credentials', done => {
      loginUser(invalidCreds).then(res => {
        expect(res.status).to.equal(422)
        expect(res.body.message).to.equal('login unsuccessful')
        expect(res.body.data[0].msg).to.equal('email address is invalid')
        done()
      })
    })
  })

  it('should handle nonexistent emails', done => {
    loginUser({ email: 'yes@example.com', password: 'password' }).then(res => {
      expect(res.status).to.equal(401)
      expect(res.body.message).to.equal('email or password incorrect')
      done()
    })
  })

  it('should handle incorrect credentials', done => {
    loginUser({ email: validCreds.email, password: 'something' }).then(res => {
      expect(res.status).to.equal(401)
      expect(res.body.message).to.equal('email or password incorrect')
      done()
    })
  })

  it('should login a user successfully', done => {
    loginUser(validCreds).then(res => {
      expect(res.status).to.equal(200)
      expect(res.body.message).to.equal('login successful')
      expect(typeof res.body.data).to.equal('string') // JWT token
      done()
    })
  })
})
