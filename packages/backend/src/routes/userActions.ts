import express from 'express'
import { getProfileController, sendInviteController, mapSocketIdToUser } from '../controllers'
import { verifyToken } from '../middlewares'

const router = express.Router()

router.get('/profile', verifyToken, getProfileController)
router.get('/sockets/:socketId', verifyToken, mapSocketIdToUser)
router.put('/invites/:email', verifyToken, sendInviteController)

export default router
