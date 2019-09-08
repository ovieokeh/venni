import dotenv from 'dotenv'
import { respondError } from '../utilities'
import { Request, Response, NextFunction } from 'express'
import { getUserFromToken } from '../services'

dotenv.config()

async function verifyToken(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { authorization } = req.headers
  if (!authorization) return respondError(res, 401, 'No token provided')

  try {
    res.locals.user = await getUserFromToken(authorization)
    next()
  } catch (error) {
    return respondError(res, 401, error.message)
  }
}

export default verifyToken
