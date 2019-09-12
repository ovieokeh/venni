import React, { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Form, Icon, Input, Button } from 'antd'
import { FormComponentProps } from 'antd/es/form'
import { WrappedFormUtils } from 'antd/es/form/Form'
import { History } from 'history'
import Logo from 'src/assets/logo.svg'
import { authRequest } from 'src/redux/actions/authentication/authActions'
import { AuthCredentials, AuthState } from 'src/redux/types'
import './Signup.less'

interface SignupProps extends FormComponentProps {
  history: History
  authState: AuthState
  signup: Function
}

interface FormValues {
  name: string
  email: string
  password: string
  readonly [x: string]: string
}

class SignupForm extends React.Component<SignupProps> {
  componentDidMount() {
    window.document.title = 'Get started - Venni'
  }

  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        const isSuccessful = await this.props.signup(values)

        if (!isSuccessful) return this.handleErrors(this.props.form, values)

        localStorage.setItem('remember', 'yes')
        this.props.history.push('/')
      }
    })
  }

  handleErrors = (
    form: WrappedFormUtils<SignupProps>,
    values: FormValues
  ): void => {
    const { error } = this.props.authState

    if (typeof error === 'string') {
      const errorMessage = new Error(error as string)

      return form.setFields({
        email: { value: values.email, errors: [errorMessage] }
      })
    }

    error.forEach(err => {
      const { param } = err

      form.setFields({
        [param]: {
          value: values[param],
          errors: [new Error(err.msg)]
        }
      })
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <div className="signup" data-aos="zoom-in">
        <h2>We're glad to have you here</h2>
        <img className="signup__logo" src={Logo} alt="Venni Logo" />

        <Form onSubmit={this.handleSubmit} className="signup__form">
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
                  <Icon
                    type="idcard"
                    style={{ color: 'rgba(0, 0, 0, 0.25)' }}
                  />
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
              loading={this.props.authState.isLoading}
            >
              Sign up
            </Button>
            Or <Link to="/login">login instead</Link>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

const WrappedSignupForm = Form.create<SignupProps>({ name: 'signup' })(
  SignupForm
)

const mapDispatchToProps = (dispatch: any) => ({
  signup: (cred: AuthCredentials) => dispatch(authRequest(cred, 'signup'))
})
const mapStateToProps = (state: any) => ({
  authState: state.auth
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedSignupForm)
