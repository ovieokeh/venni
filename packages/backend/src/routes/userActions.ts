import express from 'express'
import { getProfileController } from '../controllers'
import { verifyToken } from '../middlewares'

const router = express.Router()

router.get('/profile', verifyToken, getProfileController)

export default router
