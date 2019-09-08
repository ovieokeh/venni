import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { UserDetails } from '../interfaces'

dotenv.config()

class Auth {
  static hashPassword(password: string): string {
    const salt = bcrypt.genSaltSync(+process.env.SALT_ROUNDS)
    const hash = bcrypt.hashSync(password, salt)
    return hash
  }

  static verifyPassword(password: string, hashPassword: string): boolean {
    return bcrypt.compareSync(password, hashPassword)
  }

  static generateToken(user: UserDetails): string {
    const privateKey = process.env.SECRET_KEY
    const token = jwt.sign(user, privateKey, { expiresIn: '1d' })
    return token
  }
}

export default Auth
