import { Response } from 'express'

interface Props {
  res: Response
  status: string
  statusCode: number
  message?: string
  data?: any
}

function respond({ res, status, statusCode, message, data }: Props): void {
  res.status(statusCode).json({
    status,
    message,
    data
  })
}

function respondSuccess(res: Response, statusCode: number, message?: string, data?: any): void {
  respond({ res, status: 'success', statusCode, message, data })
}

function respondError(res: Response, statusCode: number, message: string, data?: any): void {
  respond({ res, status: 'error', statusCode, message, data })
}

export { respond, respondSuccess, respondError }
