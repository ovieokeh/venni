import { UserModel } from '../../database/models/User'
import { Auth, respondSuccess, respondError } from '../../utilities'
import { Request, Response } from 'express'
import { UserDetails } from '../../interfaces'

async function signupController(req: Request, res: Response): Promise<void> {
  try {
    const user = await UserModel.create(req.body)
    const userDetails: UserDetails = user.dataValues
    const token = Auth.generateToken({ ...userDetails, password: null })

    respondSuccess(res, 201, 'signup successful', token)
  } catch (error) {
    respondError(res, 409, 'email address already exists')
  }
}

export default signupController
