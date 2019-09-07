import { User } from '../database/models'

async function destroyUser(email: string): Promise<void> {
  await User.destroy({ where: { email } })
}

export default destroyUser
