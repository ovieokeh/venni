import { Request, Response } from 'express'
import { respondSuccess, respondError } from '../../utilities'
import { UserDetails } from '../../interfaces'

async function getUserFriendsController(_: Request, res: Response): Promise<void> {
  try {
    const { user } = res.locals
    const friends: UserDetails[] = await user.getFriends({
      attributes: ['id', 'email', 'name', 'avatarUrl']
    })

    friends.map(friend => delete (friend.dataValues as any).Friends)

    respondSuccess(res, 200, 'friends successfully retrieved', friends)
  } catch (error) {
    respondError(res, 500, error.message)
  }
}

export default getUserFriendsController
