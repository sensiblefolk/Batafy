import React from 'react'
import { connect } from 'react-redux'
import { Form, Input, Button, Divider } from 'antd'
import { Link } from 'react-router-dom'
import style from '../style.module.scss'

class Register extends React.Component {
  state = { confirmDirty: false }

  onSubmit = event => {
    event.preventDefault()
    const { form, dispatch } = this.props
    form.validateFields((error, values) => {
      if (!error) {
        dispatch({
          type: 'user/REGISTER_EMAIL',
          payload: values,
        })
      }
    })
  }

  onSignUpWithGoogle = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'user/LOGIN_WITH_GOOGLE',
    })
  }

  handleConfirmBlur = e => {
    const { value } = e.target
    this.setState(({ confirmDirty }) => confirmDirty || !!value)
  }

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!')
    } else {
      callback()
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props
    const { confirmDirty } = this.state
    if (value && confirmDirty) {
      form.validateFields(['confirm'], { force: true })
    }
    callback()
  }

  render() {
    const {
      form,
      user: { loading },
    } = this.props

    return (
      <div className={style.auth}>
        <div className="pt-5 pb-5 d-flex align-items-end mt-auto">
          <img src="../../../../resources/images/batafy-logo.png" alt="BATAFY Logo" />
          {/* <div className="air__utils__logo__text">
            <div className="air__utils__logo__name text-uppercase text-dark font-size-21">
              BATAFY
            </div>
            <div className="air__utils__logo__descr text-uppercase font-size-12 text-gray-6">
              Admin template
            </div>
          </div> */}
        </div>
        <div className={`${style.container} pl-5 pr-5 pt-5 pb-5 bg-white`}>
          <div className="text-dark font-size-30 mb-4 text-center">Sign Up</div>
          <Form layout="vertical" hideRequiredMark onSubmit={this.onSubmit} className="mb-4">
            <Form.Item>
              {form.getFieldDecorator('fullname', {
                rules: [{ required: true, message: 'Please input your full name' }],
              })(<Input size="large" placeholder="Full Name" />)}
            </Form.Item>
            <Form.Item>
              {form.getFieldDecorator('email', {
                rules: [{ required: true, message: 'Please input your e-mail address' }],
              })(<Input size="large" placeholder="Email" />)}
            </Form.Item>
            <Form.Item hasFeedback>
              {form.getFieldDecorator('password', {
                rules: [
                  { required: true, message: 'Please input your password' },
                  { validator: this.validateToNextPassword },
                ],
              })(<Input.Password size="large" placeholder="Password" />)}
            </Form.Item>
            <Form.Item hasFeedback>
              {form.getFieldDecorator('confirm', {
                rules: [
                  { required: true, message: 'Please confirm your password' },
                  { validator: this.compareToFirstPassword },
                ],
              })(
                <Input.Password
                  size="large"
                  placeholder="Confirm Password"
                  onBlur={this.handleConfirmBlur}
                />,
              )}
            </Form.Item>
            <Button
              type="button"
              htmlType="submit"
              size="large"
              className="text-center btn btn-success w-100 font-weight-bold font-size-18"
              loading={loading}
            >
              Sign up
            </Button>
          </Form>
          <Divider>Or</Divider>
          <Button
            block
            type="danger"
            ghost
            size="large"
            icon="google"
            className={`${style.googleSign} font-weight-bold font-size-18 w-100 mb-3`}
            onClick={this.onSignUpWithGoogle}
          >
            {/* <Icon type="google" theme="outlined" twoToneColor="#52c41a" /> */}
            Sign up with Google
          </Button>
          <div className="font-size-18 text-center">
            <span className="mr-1">By signing up, you agree to the</span>
            <a
              href="#"
              onClick={e => e.preventDefault()}
              className="text-blue font-weight-bold font-size-18 mr-1"
            >
              Terms of Service
            </a>{' '}
            and
            <a
              href="#"
              onClick={e => e.preventDefault()}
              className="text-blue font-weight-bold font-size-18 ml-1"
            >
              Privacy Policy
            </a>
          </div>
        </div>
        <div className="text-center font-size-18 pt-4 mb-auto">
          <span className="mr-2">Already have an account?</span>
          <Link to="/user/login" className="font-weight-bold text-blue text-underlined">
            <u>Log In</u>
          </Link>
        </div>
        <div className="mt-auto pb-5 pt-5">
          <ul
            className={`${style.footerNav} list-unstyled d-flex mb-2 flex-wrap justify-content-center`}
          >
            <li>
              <a href="#" onClick={e => e.preventDefault()}>
                Terms of Use
              </a>
            </li>
            <li>
              <a href="#" onClick={e => e.preventDefault()}>
                Compliance
              </a>
            </li>
            <li>
              <a href="#" onClick={e => e.preventDefault()}>
                Support
              </a>
            </li>
            <li>
              <a href="#" onClick={e => e.preventDefault()}>
                Contacts
              </a>
            </li>
          </ul>
          <div className="text-gray-4 text-center">
            © {new Date().getFullYear()} Batafy. All rights reserved.
          </div>
        </div>
      </div>
    )
  }
}

const formCreate = Form.create({ name: 'register' })

export default formCreate(connect(({ user }) => ({ user }))(Register))
