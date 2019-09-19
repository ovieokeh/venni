import 'mocha'
import chai from 'chai'
import { AuthCredentials } from '../../interfaces'
import { TestUtils } from '../../utilities'

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
let user2Token: string

describe('Get Invites Controller', () => {
  before('setup', async () => {
    await Promise.all([TestUtils.addUser(user1), TestUtils.addUser(user2)])

    await TestUtils.loginUser(user1).then(res => {
      user1Token = res.body.data
    })

    await TestUtils.loginUser(user2).then(res => {
      user2Token = res.body.data
    })

    await TestUtils.sendInvite(user2.email, user1Token)
  })

  after('cleanup', async () => {
    await TestUtils.destroyUser(user1.email)
    await TestUtils.destroyUser(user2.email)
  })

  describe('validations', () => {
    it('should handle no authorization token', done => {
      TestUtils.getInvites().then(res => {
        expect(res.status).to.equal(401)
        done()
      })
    })
  })

  it('should retrieve invites successfully', done => {
    TestUtils.getInvites(user2Token).then(res => {
      expect(res.status).to.equal(200)
      expect(res.body.message).to.equal('invites successfully retrieved')
      expect(res.body.data.receivedInvites.length).equal(1)
      expect(res.body.data.receivedInvites[0].name).equal('User One')
      done()
    })
  })
})
