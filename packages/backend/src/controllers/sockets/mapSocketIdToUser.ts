import { Request, Response } from 'express'
import { respondSuccess, context } from '../../utilities'

function mapSocketIdToUser(req: Request, res: Response): void {
  const {
    user: { dataValues }
  } = res.locals
  const { socketId } = req.params

  context.connectedClients[dataValues.id] = socketId
  respondSuccess(res, 204)
}

export default mapSocketIdToUser
