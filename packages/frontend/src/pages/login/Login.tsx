import React, { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import { FormComponentProps } from 'antd/es/form'
import { History } from 'history'
import Logo from 'src/assets/logo.svg'
import './Login.less'

interface LoginProps extends FormComponentProps {
  history: History
}

class LoginForm extends React.Component<LoginProps> {
  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div className="login" data-aos="zoom-in">
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

const WrappedLoginForm = Form.create<LoginProps>({ name: 'login' })(LoginForm)
export default WrappedLoginForm
