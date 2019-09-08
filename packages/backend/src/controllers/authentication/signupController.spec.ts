import 'mocha'
import chai from 'chai'
import { AuthCredentials } from '../../interfaces'
import { TestUtils } from '../../utilities'

const { expect } = chai

const invalidDetails: AuthCredentials = {
  name: '',
  email: '1@1.c',
  password: 'password'
}

const validDetails: AuthCredentials = {
  name: 'Buzz Lightyear',
  email: 'buzz@lightyear.com',
  password: 'password1'
}

describe('Signup Controller', () => {
  after('cleanup', async () => {
    await TestUtils.destroyUser(validDetails.email)
  })

  describe('validations', () => {
    it('should handle no credentials', done => {
      TestUtils.addUser().then(res => {
        expect(res.status).to.equal(422)
        expect(res.body.message).to.equal('signup unsuccessful')
        expect(res.body.data[0].msg).to.equal('name must be provided')
        expect(res.body.data[1].msg).to.equal('email must be provided')
        expect(res.body.data[2].msg).to.equal('password must be provided')
        done()
      })
    })

    it('should handle invalid credentials', done => {
      TestUtils.addUser(invalidDetails).then(res => {
        expect(res.status).to.equal(422)
        expect(res.body.message).to.equal('signup unsuccessful')
        expect(res.body.data[0].msg).to.equal('name must be longer than 2 characters')
        expect(res.body.data[1].msg).to.equal('email address is invalid')
        expect(res.body.data[2].msg).to.equal('password must contain a number')
        done()
      })
    })
  })

  it('should signup a user successfully', done => {
    TestUtils.addUser(validDetails).then(res => {
      expect(res.status).to.equal(201)
      expect(res.body.message).to.equal('signup successful')
      expect(typeof res.body.data).to.equal('string') // JWT token
      done()
    })
  })

  it('should handle duplicate signups', done => {
    TestUtils.addUser(validDetails).then(res => {
      expect(res.status).to.equal(409)
      expect(res.body.message).to.equal('email address already exists')
      done()
    })
  })
})
