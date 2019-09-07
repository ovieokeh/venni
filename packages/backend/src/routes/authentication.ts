import express from 'express'
import { signupController, loginController } from '../controllers'
import { validateSignup, validateLogin, signupValidations, loginValidations } from '../middlewares'

const router = express.Router()

router.post('/signup', signupValidations, validateSignup, signupController)
router.post('/login', loginValidations, validateLogin, loginController)

export default router
