import { Request } from 'express'
import { validationResult, ValidationError } from 'express-validator'

function validate(req: Request): ValidationError[] | void {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return errors.array()
}

export default validate
