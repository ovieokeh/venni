import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import {
  Form, Icon, Input, Checkbox, Button,
} from 'antd';
import { loginRequest } from 'actions/authentication/authActions';
import './Login.scss';
import logo from 'assets/logo.svg';

const LoginForm = (props) => {
  window.document.title = 'Login | Venni';

  const {
    form, login, history,
  } = props;
  const { getFieldDecorator } = form;

  const handleSubmit = (event) => {
    event.preventDefault();

    form.validateFields(async (err, values) => {
      if (!err) {
        const success = await login(values);
        if (success) {
          if (values.remember) {
            localStorage.setItem('remember', 'yes');
          }
          history.push('/app');
        }
      }
    });
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <img alt="logo" src={logo} />
        <Form onSubmit={handleSubmit} className="login-form">
          <Form.Item>
            {
                getFieldDecorator('email', {
                  rules: [{
                    required: true,
                    message: 'Please input your email!',
                  }],
                })(<Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}
                  placeholder="Email"
                />)
              }
          </Form.Item>
          <Form.Item>
            {
                getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your Password!',
                    },
                  ],
                })(<Input.Password prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />)
              }
          </Form.Item>
          <Form.Item>
            <div className="remember">
              {
                  getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: false,
                  })(<Checkbox>Remember me</Checkbox>)
              }
              <Link className="login-form-forgot" to="/forgot">Forgot password</Link>
            </div>
          </Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button" block>
            Log in
          </Button>
          <div className="actions">
            <span>Or</span>
            <Link to="/signup">Create an account</Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

LoginForm.propTypes = {
  form: propTypes.instanceOf(Object).isRequired,
  login: propTypes.func.isRequired,
  history: propTypes.instanceOf(Object).isRequired,
};

const WrappedLoginForm = Form.create({ name: 'login_form' })(LoginForm);

const mapDispatchToProps = dispatch => ({
  login: userDetails => dispatch(loginRequest(userDetails)),
});

const ConnectedLoginForm = connect(null, mapDispatchToProps)(WrappedLoginForm);

export default ConnectedLoginForm;
