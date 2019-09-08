import { respondSuccess, respondError } from '../../utilities'
import { Request, Response } from 'express'

async function getProfileController(_: Request, res: Response): Promise<void> {
  try {
    const {
      user: { dataValues }
    } = res.locals

    return respondSuccess(res, 200, 'profile successfully retrieved', dataValues)
  } catch (err) {
    return respondError(res, 500, err.message)
  }
}

export default getProfileController
