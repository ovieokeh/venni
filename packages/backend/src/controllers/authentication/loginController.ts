import { Request, Response } from 'express'
import { Auth, respondSuccess, respondError } from '../../utilities'
import { authenticateUser } from '../../services'
import { UserDetails } from '../../interfaces'

async function loginController(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body
  let userDetails: UserDetails

  try {
    userDetails = await authenticateUser({ email, password })
  } catch (err) {
    return respondError(res, 401, err.message)
  }

  const token = Auth.generateToken({ ...userDetails, password: null })

  respondSuccess(res, 200, 'login successful', token)
}

export default loginController
