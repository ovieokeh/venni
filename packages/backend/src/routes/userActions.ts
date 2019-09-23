import express from 'express'
import {
  getProfileController,
  getUserFriendsController,
  unfriendController,
  mapSocketIdToUser
} from '../controllers'
import { verifyToken } from '../middlewares'

const router = express.Router()

router.get('/profile', verifyToken, getProfileController) // get profile
router.get('/friends', verifyToken, getUserFriendsController) // get friends
router.delete('/friends/:email', verifyToken, unfriendController)
router.get('/sockets/:socketId', verifyToken, mapSocketIdToUser) // map socketID to user

export default router
