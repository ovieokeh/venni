import dotenv from 'dotenv'
import { respond } from '../utilities'
import { Request, Response, NextFunction } from 'express'
import { getUserFromToken } from '../services'

dotenv.config()

async function verifyToken(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { authorization } = req.headers

  if (!authorization) return respond({ res, status: 'error', statusCode: 401, message: 'No token provided' })

  try {
    res.locals.user = await getUserFromToken(authorization)
    next()
  } catch (error) {
    return respond({ res, status: 'error', statusCode: 401, message: error.message })
  }
}

export default verifyToken
