import { Request, Response } from 'express'
import { respondSuccess, respondError } from '../../utilities'
import { Invite } from '../../interfaces'

async function getInvites(_: Request, res: Response): Promise<void> {
  try {
    const { user } = res.locals

    const receivedInvites: Invite[] = await user.getInvites({
      attributes: ['id', 'email', 'name', 'avatarUrl']
    })

    const sentInvites: Invite[] = await user.getSentInvites({
      attributes: ['id', 'email', 'name', 'avatarUrl']
    })

    receivedInvites.map(friend => delete friend.dataValues.FriendInvites)
    sentInvites.map(friend => delete friend.dataValues.FriendInvites)

    const invites = {
      receivedInvites,
      sentInvites
    }

    return respondSuccess(res, 200, 'invites successfully retrieved', invites)
  } catch (error) {
    return respondError(res, 500, error.message)
  }
}

export default getInvites
