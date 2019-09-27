// third-party libraries
import React, { useState, useEffect, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Form, Icon, Input, Button } from 'antd'
import { FormComponentProps } from 'antd/es/form'
import { WrappedFormUtils } from 'antd/es/form/Form'
import { History } from 'history'

// custom imports
import Logo from 'src/assets/logo.svg'
import { withFirebase } from 'src/firebase'
import { FirebaseCtx } from 'src/firebase/interfaces'
import * as firebaseErrorCodes from 'src/firebase/errorCodes'
import './Signup.less'

interface SignupProps extends FormComponentProps {
  history: History
  firebase: FirebaseCtx
}

interface FormValues {
  name: string
  email: string
  password: string
  readonly [x: string]: string
}

const Signup: React.FC<SignupProps> = props => {
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    window.document.title = 'Get started - Venni'
  }, [])

  const handleErrors = (
    form: WrappedFormUtils<SignupProps>,
    values: FormValues,
    error: any
  ): void => {
    const errorMatcher: firebaseErrorCodes.ErrorMatcher = {
      [firebaseErrorCodes.AUTH_INVALID_EMAIL]: 'email',
      [firebaseErrorCodes.AUTH_CONFLICTING_EMAIL]: 'email',
      [firebaseErrorCodes.AUTH_WEAK_PASSWORD]: 'password'
    }

    form.setFields({
      [errorMatcher[error.code]]: {
        value: values[errorMatcher[error.code]],
        errors: [new Error(error.message)]
      }
    })
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    const { form, firebase, history } = props

    form.validateFieldsAndScroll(
      (err, { name, email, password }: FormValues) => {
        if (!err) {
          try {
            setIsLoading(true)

            firebase.createUser(name, email, password).then(() => {
              history.push('/')
            })
          } catch (err) {
            handleErrors(form, { name, email, password }, err)
            setIsLoading(false)
          }
        }
      }
    )
  }

  const { getFieldDecorator } = props.form

  return (
    <div className="signup" data-aos="zoom-in">
      <h2>We&apos;re glad to have you here</h2>
      <img className="signup__logo" src={Logo} alt="Venni Logo" />

      <Form onSubmit={handleSubmit} className="signup__form">
        <Form.Item>
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: 'Please input your name!'
              }
            ]
          })(
            <Input
              prefix={
                <Icon type="idcard" style={{ color: 'rgba(0, 0, 0, 0.25)' }} />
              }
              placeholder="Your name"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your email' }]
          })(
            <Input
              prefix={
                <Icon type="mail" style={{ color: 'rgba(0, 0, 0, 0.25)' }} />
              }
              type="email"
              placeholder="Email"
            />
          )}
        </Form.Item>

        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password' }]
          })(
            <Input
              prefix={
                <Icon type="lock" style={{ color: 'rgba(0, 0, 0, 0.25)' }} />
              }
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="signup__form__button"
            icon="rocket"
            loading={isLoading}
          >
            Sign up
          </Button>
          Or <Link to="/login">login instead</Link>
        </Form.Item>
      </Form>
    </div>
  )
}

export default withFirebase(
  Form.create<SignupProps>({ name: 'signup' })(Signup)
)
