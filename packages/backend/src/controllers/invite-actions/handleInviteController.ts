import { UserModel } from '../../database/models/User'
import { respondError, respondSuccess, context } from '../../utilities'
import { Request, Response } from 'express'

async function handleInviteController(req: Request, res: Response): Promise<void> {
  try {
    const {
      method,
      params: { email }
    } = req
    const { user } = res.locals
    const { socket, connectedClients } = context

    const incomingInvite = await UserModel.findOne({
      where: { email },
      attributes: { exclude: ['password'] }
    })

    if (!(await user.hasInvite(incomingInvite.id)))
      return respondError(res, 404, "you don't have an invite from this person")

    if (method === 'DELETE') {
      await user.removeInvite(incomingInvite.id)

      socket
        .to(connectedClients[incomingInvite.id])
        .emit('handledSentInvite', { action: 'declined', inviteId: user.id })

      socket
        .to(connectedClients[user.id])
        .emit('handledReceivedInvite', { action: 'declined', inviteId: incomingInvite.id })

      respondSuccess(res, 200, 'invite declined successfully')
      return
    }

    await Promise.all([
      user.removeInvite(incomingInvite.id),
      user.addFriend(incomingInvite.id),
      incomingInvite.addFriend(user.id)
    ])

    socket
      .to(connectedClients[incomingInvite.id])
      .emit('handledSentInvite', { action: 'accepted', friend: user })

    socket.to(connectedClients[user.id]).emit('handledReceivedInvite', {
      action: 'accepted',
      friend: incomingInvite
    })

    respondSuccess(res, 200, 'invite accepted successfully')
  } catch (err) {
    console.log(err.message)
    respondError(res, 500, err.message)
  }
}

export default handleInviteController
