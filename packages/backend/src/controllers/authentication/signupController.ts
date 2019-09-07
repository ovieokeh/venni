import { User } from '../../database/models'
import { Auth, respond } from '../../utilities'
import { Request, Response } from 'express'
import { UserDetails } from '../../interfaces'

async function signupController(req: Request, res: Response): Promise<void> {
  try {
    const user = await User.create(req.body)
    const userDetails: UserDetails = user.dataValues
    const token = Auth.generateToken(userDetails)

    respond({ res, status: 'success', statusCode: 201, message: 'signup successful', data: token })
  } catch (error) {
    respond({ res, status: 'error', statusCode: 409, message: 'email address already exists' })
  }
}

export default signupController
