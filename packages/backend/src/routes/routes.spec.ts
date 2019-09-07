import chai from 'chai'
import chaiHttp from 'chai-http'
import server from '../app'

chai.use(chaiHttp)
const { expect } = chai

describe('Index Route', () => {
  it('wildcard works as expected', done => {
    chai
      .request(server)
      .get('/invalid')
      .end((_, res) => {
        expect(res.status).to.equal(200)
        expect(res.body.message).to.equal('Welcome to Venni')
        done()
      })
  })
})
