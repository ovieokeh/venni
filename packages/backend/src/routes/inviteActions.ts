import express from 'express'
import {
  sendInviteController,
  cancelInviteController,
  handleInviteController,
  getUserInvites
} from '../controllers'
import { verifyToken } from '../middlewares'

const router = express.Router()

router.put('/invites/:email', verifyToken, sendInviteController) // send friend request
router.delete('/invites/:email', verifyToken, cancelInviteController) // cancel friend request
router.put('/invites/:email/actions', verifyToken, handleInviteController) // accept friend request
router.delete('/invites/:email/actions', verifyToken, handleInviteController) // decline friend request
router.get('/invites', verifyToken, getUserInvites) // get user invites

export default router
