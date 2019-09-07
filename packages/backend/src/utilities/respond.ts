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

export default respond
