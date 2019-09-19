import { Request, Response } from 'express'
import { UserModel } from '../../database/models/User'
import { respondSuccess, respondError, context } from '../../utilities'

async function cancelInviteController(req: Request, res: Response): Promise<void> {
  try {
    const { user } = res.locals
    const { email } = req.params

    if (user.dataValues.email === email)
      return respondError(res, 400, "you can't delete an invite to yourself")

    const invitee = await UserModel.findOne({ where: { email } })
    if (!invitee) return respondError(res, 404, 'invitee not found')

    await invitee.removeInvite(user.id)

    context.socket
      .to(context.connectedClients[user.id])
      .emit('handledSentInvite', { action: 'canceled', inviteId: invitee.id })

    context.socket
      .to(context.connectedClients[invitee.id])
      .emit('handledReceivedInvite', { action: 'canceled', inviteId: user.id })

    respondSuccess(res, 200, 'invite canceled successfully')
  } catch (error) {
    respondError(res, 500, error.message)
  }
}

export default cancelInviteController
