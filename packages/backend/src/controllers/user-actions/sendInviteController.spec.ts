import 'mocha'
import chai from 'chai'
import { AuthCredentials } from '../../interfaces'
import { addUser, loginUser, destroyUser, sendInvite } from '../../test-utils'

const { expect } = chai

const user1: AuthCredentials = {
  name: 'User One',
  email: 'dummy1@example.com',
  password: 'password1'
}

const user2: AuthCredentials = {
  name: 'User Two',
  email: 'dummy2@example.com',
  password: 'password1'
}

let user1Token: string

describe('Send Invite Controller', () => {
  before('setup', async () => {
    await Promise.all([addUser(user1), addUser(user2)])

    await loginUser(user1).then(res => {
      user1Token = res.body.data
    })
  })

  after('cleanup', async () => {
    await destroyUser(user1.email)
    await destroyUser(user2.email)
  })

  describe('validations', () => {
    it('should handle no authorization token', done => {
      sendInvite(user2.email).then(res => {
        expect(res.status).to.equal(401)
        done()
      })
    })

    it('should handle non-existent email addresses', done => {
      sendInvite('fake@user.com', user1Token).then(res => {
        expect(res.status).to.equal(404)
        expect(res.body.message).to.equal('user not found')
        done()
      })
    })

    it('should not process self invites', done => {
      sendInvite(user1.email, user1Token).then(res => {
        expect(res.status).to.equal(400)
        expect(res.body.message).to.equal("you can't send yourself a friend request")
        done()
      })
    })
  })

  it('should send an invite successfully', done => {
    sendInvite(user2.email, user1Token).then(res => {
      expect(res.status).to.equal(200)
      expect(res.body.message).to.equal('invite sent successfully')
      done()
    })
  })
})
