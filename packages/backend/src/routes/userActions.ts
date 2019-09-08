import express from 'express'
import {
  getProfileController,
  sendInviteController,
  cancelInviteController,
  mapSocketIdToUser
} from '../controllers'
import { verifyToken } from '../middlewares'

const router = express.Router()

router.get('/profile', verifyToken, getProfileController) // get profile
router.get('/sockets/:socketId', verifyToken, mapSocketIdToUser) // map socketID to user
router.put('/invites/:email', verifyToken, sendInviteController) // send friend request
router.delete('/invites/:email', verifyToken, cancelInviteController) // cancel friend request

export default router
