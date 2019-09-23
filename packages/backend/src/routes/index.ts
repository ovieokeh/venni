import express from 'express'
import authRoutes from './authentication'
import userActionsRoutes from './userActions'
import inviteActions from './inviteActions'

const router = express.Router()

router.use('/api', [authRoutes, userActionsRoutes, inviteActions])

export default router
