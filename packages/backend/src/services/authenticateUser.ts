import { User } from '../database/models'
import { Auth } from '../utilities'
import { AuthCredentials, UserDetails } from '../interfaces'

async function authenticateUser(credentials: AuthCredentials): Promise<UserDetails> {
  const { email, password } = credentials
  const error = new Error('email or password incorrect')

  const user = await User.findOne({ where: { email } })

  if (!user) throw error

  const userDetails: UserDetails = user.dataValues
  const checkPassword = Auth.verifyPassword(password, userDetails.password)

  if (!checkPassword) throw error

  return userDetails
}

export default authenticateUser
