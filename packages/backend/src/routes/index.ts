import express from 'express'
import authRoutes from './authentication'
import userActionsRoutes from './userActions'

const router = express.Router()

router.use('/api', [authRoutes, userActionsRoutes])

router.use('*', (_, response) =>
  response.status(200).json({
    status: 'success',
    message: 'Welcome to Venni'
  })
)

export default router
