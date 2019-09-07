import { Request, Response } from 'express'
import { Auth, respond } from '../../utilities'
import { authenticateUser } from '../../services'
import { UserDetails } from '../../interfaces'

async function loginController(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body
  let userDetails: UserDetails

  try {
    userDetails = await authenticateUser({ email, password })
  } catch (err) {
    return respond({ res, status: 'error', statusCode: 401, message: err.message })
  }

  const token = Auth.generateToken(userDetails)

  respond({ res, status: 'success', statusCode: 200, message: 'login successful', data: token })
}

export default loginController
