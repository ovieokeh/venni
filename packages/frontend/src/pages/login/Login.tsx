import React, { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import { FormComponentProps } from 'antd/es/form'
import { WrappedFormUtils } from 'antd/es/form/Form'
import { History } from 'history'
import Logo from 'src/assets/logo.svg'
import { authRequest } from 'src/redux/actions/authentication/authActions'
import { AuthCredentials, AuthState } from 'src/redux/types'
import './Login.less'

interface LoginProps extends FormComponentProps {
  history: History
  authState: AuthState
  login: Function
}

interface FormValues {
  email: string
  password: string
  remember: boolean
  readonly [x: string]: string | boolean
}

export class LoginForm extends React.Component<LoginProps> {
  componentDidMount() {
    window.document.title = 'Log into your account - Venni'
  }

  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        const isSuccessful = await this.props.login(values)

        if (!isSuccessful) return this.handleErrors(this.props.form, values)

        values.remember && localStorage.setItem('remember', 'yes')
        this.props.history.push('/')
      }
    })
  }

  handleErrors = (
    form: WrappedFormUtils<LoginProps>,
    values: FormValues
  ): void => {
    const { error } = this.props.authState

    if (typeof error === 'string') {
      const errorMessage = new Error(error as string)

      return form.setFields({
        email: { value: values.email, errors: [errorMessage] },
        password: { value: values.password, errors: [errorMessage] }
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
      <div className="login" data-aos="zoom-in">
        <h2>Welcome back to Venni</h2>
        <img className="login__logo" src={Logo} alt="Venni Logo" />

        <Form onSubmit={this.handleSubmit} className="login__form">
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
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true
            })(<Checkbox>Remember me</Checkbox>)}
            <Button
              type="primary"
              htmlType="submit"
              className="login__form__button"
              icon="login"
              loading={this.props.authState.isLoading}
            >
              Log in
            </Button>
            Or <Link to="/signup">signup instead</Link>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export const WrappedLoginForm = Form.create<LoginProps>({ name: 'login' })(
  LoginForm
)

const mapDispatchToProps = (dispatch: any) => ({
  login: (cred: AuthCredentials) => dispatch(authRequest(cred, 'login'))
})
const mapStateToProps = (state: any) => ({
  authState: state.auth
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedLoginForm)
