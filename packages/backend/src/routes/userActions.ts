import express from 'express'
import {
  getProfileController,
  sendInviteController,
  cancelInviteController,
  mapSocketIdToUser,
  getUserInvites
} from '../controllers'
import { verifyToken } from '../middlewares'

const router = express.Router()

router.get('/profile', verifyToken, getProfileController) // get profile
router.get('/sockets/:socketId', verifyToken, mapSocketIdToUser) // map socketID to user
router.put('/invites/:email', verifyToken, sendInviteController) // send friend request
router.delete('/invites/:email', verifyToken, cancelInviteController) // cancel friend request
router.get('/invites', verifyToken, getUserInvites) // get user invites

export default router
