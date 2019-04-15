import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import {
  Form, Icon, Input, Button,
} from 'antd';
import { Logo } from 'components/common';
import { signupRequest } from 'actions/authentication/authActions';
import './Signup.less';

function SignupForm(props) {
  window.document.title = 'Get Started | Venni';

  const { form, signup, history } = props;
  const { getFieldDecorator } = form;

  const handleSubmit = (event) => {
    event.preventDefault();

    form.validateFields(async (err, values) => {
      if (!err) {
        const success = await signup(values);
        if (success) {
          history.push('/');
        }
      }
    });
  };

  return (
    <div className="signup-container">
      <div className="form-container">
        <Logo fill="white" />
        <Form onSubmit={handleSubmit} className="signup-form" layout="vertical">
          <Form.Item
            label="Name"
            hasFeedback
          >
            {
                getFieldDecorator('name', {
                  rules: [{
                    required: true,
                    message: 'Please input your name!',
                  }],
                })(<Input
                  prefix={<Icon type="idcard" style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}
                  placeholder="John Doe"
                />)
              }
          </Form.Item>
          <Form.Item
            label="Email Address"
            hasFeedback
          >
            {
                getFieldDecorator('email', {
                  rules: [{
                    required: true,
                    message: 'Please input your email!',
                  }, {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  }],
                })(<Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}
                  placeholder="Email"
                />)
              }
          </Form.Item>
          <Form.Item
            label="Password"
            help="Minimum of 6 characters and must contain at least one number"
          >
            {
                getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      pattern: /\d/,
                    },
                    {
                      min: 6,
                    },
                  ],
                })(<Input.Password prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Enter a secure password" />)
              }
          </Form.Item>
          <Button type="primary" htmlType="submit" className="signup-form-button" block>
            Signup
          </Button>
          <div className="actions">
            <span>Or</span>
            <Link to="/login">Login to your account</Link>
          </div>
        </Form>
        <p className="terms-cta">
          By signing up, you agree to our
          <Link to="/terms">
            {' terms and conditions'}
          </Link>
        </p>
      </div>
    </div>
  );
}

SignupForm.propTypes = {
  form: propTypes.instanceOf(Object).isRequired,
  signup: propTypes.func.isRequired,
  history: propTypes.instanceOf(Object).isRequired,
};

const WrappedSignupForm = Form.create({ name: 'signup_form' })(SignupForm);

const mapDispatchToProps = dispatch => ({
  signup: userDetails => dispatch(signupRequest(userDetails)),
});

const ConnectedSignup = connect(null, mapDispatchToProps)(WrappedSignupForm);

export default ConnectedSignup;
