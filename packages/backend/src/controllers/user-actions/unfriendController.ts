import { Request, Response } from 'express'
import { respondSuccess, respondError, context } from '../../utilities'
import { UserModel } from '../../database/models/User'

async function unfriendController(req: Request, res: Response): Promise<void> {
  try {
    const { user } = res.locals
    const { email } = req.params
    const { socket, connectedClients } = context

    if (user.email === email) {
      respondError(res, 400, "you can't unfriend yourself")
      return
    }

    const friend = await UserModel.findOne({ where: { email } })
    if (!friend) {
      respondError(res, 404, 'user not found')
      return
    }

    if (!(await user.hasFriend(friend.id))) {
      respondError(res, 404, 'this user is not your friend')
      return
    }

    await Promise.all([user.removeFriend(friend), friend.removeFriend(user)])

    socket.to(connectedClients[user.id]).emit('unfriend', friend.id)
    socket.to(connectedClients[friend.id]).emit('unfriend', user.id)

    respondSuccess(res, 200, `${friend.name} is no longer your friend`)
  } catch (error) {
    respondError(res, 500, error.message)
  }
}

export default unfriendController
