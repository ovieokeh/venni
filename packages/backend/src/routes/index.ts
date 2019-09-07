import express from 'express'
import authRoutes from './authentication'

const router = express.Router()

router.use(authRoutes)
router.use('*', (_, response) =>
  response.status(200).json({
    status: 'success',
    message: 'Welcome to Venni'
  })
)

export default router
