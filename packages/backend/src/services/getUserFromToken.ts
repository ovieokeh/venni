import jwt from 'jsonwebtoken'
import { UserModel } from '../database/models/User'
import { UserDetails } from '../interfaces'

async function getUserFromToken(token: string): Promise<UserDetails> {
  const { SECRET_KEY } = process.env

  try {
    const decoded = jwt.verify(token, SECRET_KEY)
    const user = await UserModel.findByPk((decoded as UserDetails).id, {
      attributes: ['id', 'email', 'name', 'avatarUrl', 'createdAt']
    })

    return user
  } catch (err) {
    const errorMessage =
      err.name === 'TokenExpiredError'
        ? 'Your token is expired. Please request a new one by logging in again'
        : 'Unable to verify token. Please request a new one by logging in again'
    throw new Error(errorMessage)
  }
}

export default getUserFromToken
