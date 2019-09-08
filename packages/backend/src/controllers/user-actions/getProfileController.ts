import { respond } from '../../utilities'
import { Request, Response } from 'express'

async function getProfileController(_: Request, res: Response): Promise<void> {
  try {
    const {
      user: { dataValues }
    } = res.locals

    return respond({
      res,
      status: 'success',
      statusCode: 200,
      message: 'profile successfully retrieved',
      data: dataValues
    })
  } catch (err) {
    return respond({ res, status: 'error', statusCode: 500, message: err.message })
  }
}

export default getProfileController
