import { User } from '../../database/models'
import { respondError, respondSuccess, context } from '../../utilities'
import { Request, Response } from 'express'
import { getInvite } from '../../services'

async function sendInviteController(req: Request, res: Response): Promise<void> {
  try {
    const { email } = req.params
    const { user } = res.locals

    if (user.dataValues.email === email)
      return respondError(res, 400, "you can't send yourself a friend request")

    const receivingInvite = await User.findOne({ where: { email } })
    if (!receivingInvite) return respondError(res, 404, 'user not found')

    await receivingInvite.addInvite(user.dataValues.id)

    const friendInvite = await getInvite(receivingInvite, 'getInvites')
    const userInvite = await getInvite(user, 'getSentInvites')

    context.socket.to(context.connectedClients[user.id]).emit('newSentInvite', userInvite)
    context.socket
      .to(context.connectedClients[receivingInvite.id])
      .emit('newReceivedInvite', friendInvite)

    respondSuccess(res, 200, 'invite sent successfully')
  } catch (error) {
    respondError(res, 500, error.message)
  }
}

export default sendInviteController
