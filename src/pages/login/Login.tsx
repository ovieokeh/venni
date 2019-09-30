// third-party libraries
import React, { useState, useEffect, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import { FormComponentProps } from 'antd/es/form'
import { WrappedFormUtils } from 'antd/es/form/Form'

// custom imports
import Logo from 'src/assets/logo.svg'
import { withFirebase } from 'src/firebase'
import { FirebaseCtx } from 'src/firebase/interfaces'
import * as firebaseErrorCodes from 'src/firebase/errorCodes'
import './Login.less'

interface LoginProps extends FormComponentProps {
  firebase: FirebaseCtx
}

interface FormValues {
  email: string
  password: string
  remember: boolean
  readonly [x: string]: string | boolean
}

const Login: React.FC<LoginProps> = props => {
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    window.document.title = 'Log into your account - Venni'
  }, [])

  const handleErrors = (
    form: WrappedFormUtils<LoginProps>,
    values: FormValues,
    error: any
  ): void => {
    const errorMatcher: firebaseErrorCodes.ErrorMatcher = {
      [firebaseErrorCodes.AUTH_INVALID_EMAIL]: 'email',
      [firebaseErrorCodes.AUTH_USER_DISABLED]: 'email',
      [firebaseErrorCodes.AUTH_USER_NOT_FOUND]: 'email',
      [firebaseErrorCodes.AUTH_USER_WRONG_PASSWORD]: 'password'
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

    const { form, firebase } = props

    form.validateFieldsAndScroll(
      async (err, { email, password, remember }: FormValues) => {
        if (!err) {
          try {
            setIsLoading(true)
            const persistence = remember ? 'local' : 'none'

            await firebase.auth.setPersistence(persistence)
            await firebase.auth.signInWithEmailAndPassword(email, password)
          } catch (err) {
            handleErrors(form, { email, password, remember }, err)
            setIsLoading(false)
          }
        }
      }
    )
  }

  const { getFieldDecorator } = props.form

  return (
    <div className="login" data-aos="zoom-in">
      <h2>Welcome back to Venni</h2>
      <img className="login__logo" src={Logo} alt="Venni Logo" />

      <Form onSubmit={handleSubmit} className="login__form">
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
              autoComplete="email"
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
              autoComplete="current-password"
            />
          )}
        </Form.Item>

        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true
          })(<Checkbox>Remember me</Checkbox>)}
          <Button
            type="primary"
            htmlType="submit"
            className="login__form__button"
            icon="login"
            loading={isLoading}
          >
            Log in
          </Button>
          Or <Link to="/signup">signup instead</Link>
        </Form.Item>
      </Form>
    </div>
  )
}

export default withFirebase(Form.create<LoginProps>({ name: 'login' })(Login))
