import path from 'path'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import http from 'http'
import routes from './routes'
import { setupSockets } from './utilities'

dotenv.config()
const app = express()
const port = process.env.PORT || 7000
const { log } = console

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join('..', 'frontend', 'build')))
app.get('/', function(req, res) {
  res.sendFile(path.join('..', 'frontend', 'build', 'index.html'))
})
app.use(routes)

const server = http.createServer(app)

setupSockets(server)

server.listen(port, () => log(`server running on port ${port}`))

export default server
