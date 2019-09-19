import express from 'express'
import authRoutes from './authentication'
import userActionsRoutes from './userActions'

const router = express.Router()

router.use('/api', [authRoutes, userActionsRoutes])

export default router
