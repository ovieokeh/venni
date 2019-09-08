import { check } from 'express-validator'
import validate from './validate'
import { Request, Response, NextFunction } from 'express'
import { respondError, Auth } from '../utilities'

export const signupValidations = [
  check('name', 'name must be provided')
    .exists()
    .bail()
    .trim()
    .isLength({ min: 2 })
    .withMessage('name must be longer than 2 characters')
    .bail()
    .matches(/^[A-Za-z ]+$/)
    .withMessage('name must contain only letters and spaces'),

  check('email', 'email must be provided')
    .exists()
    .bail()
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('email address is invalid'),

  check('password', 'password must be provided')
    .exists()
    .bail()
    .trim()
    .isLength({ min: 6 })
    .withMessage('password must be longer than 6 characters')
    .bail()
    .matches(/\d/)
    .withMessage('password must contain a number')
]

export const loginValidations = [
  check('email', 'email must be provided')
    .exists()
    .bail()
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('email address is invalid'),

  check('password', 'password must be provided')
    .exists()
    .bail()
]

export function validateSignup(req: Request, res: Response, next: NextFunction): void {
  const errors = validate(req)
  if (errors) return respondError(res, 422, 'signup unsuccessful', errors)

  req.body.password = Auth.hashPassword(req.body.password)
  req.body.avatarUrl = process.env.DEFAULT_PROFILE_PICTURE
  next()
}

export function validateLogin(req: Request, res: Response, next: NextFunction): void {
  const errors = validate(req)
  if (errors) return respondError(res, 422, 'login unsuccessful', errors)

  next()
}
