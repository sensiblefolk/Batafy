import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Input, Button } from 'antd'
import { Link } from 'react-router-dom'
import style from '../style.module.scss'

const Login = props => {
  const user = useSelector(state => state.user)
  const { form } = props
  const dispatch = useDispatch()
  const onSubmit = event => {
    event.preventDefault()
    form.validateFields((error, values) => {
      if (!error) {
        dispatch({
          type: 'user/LOGIN',
          payload: values,
        })
      }
    })
  }

  const onSignInWithGoogle = () => {
    dispatch({
      type: 'user/LOGIN_WITH_GOOGLE',
    })
  }

  return (
    <div className={style.auth}>
      <div className="pt-5 pb-5 d-flex align-items-end mt-auto">
        <img src="../../../../resources/images/batafy-logo.png" alt="BATAFY Logo" />
        <div className="air__utils__logo__text">
          {/* <div className="air__utils__logo__name text-uppercase text-dark font-size-21">BATAFY</div> */}
          {/* <div className="air__utils__logo__descr text-uppercase font-size-12 text-gray-6">
            Admin template
          </div> */}
        </div>
      </div>
      <div className={`${style.container} pl-5 pr-5 pt-5 pb-5 bg-white`}>
        <div className="text-dark font-size-30 mb-2 text-center">Log In</div>
        {/* <div className="text-muted text-center mb-4">
          Login and password - admin@mediatec.org / mediatec
        </div> */}
        <Form layout="vertical" hideRequiredMark onSubmit={onSubmit} className="mb-4">
          <Form.Item>
            {form.getFieldDecorator('email', {
              rules: [{ required: true, message: 'Please input your e-mail address' }],
            })(<Input size="large" placeholder="Email" />)}
          </Form.Item>
          <Form.Item>
            {form.getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your password' }],
            })(<Input size="large" type="password" placeholder="Password" />)}
          </Form.Item>
          <Button
            type="primary"
            size="large"
            className="text-center w-100 font-weight-bold font-size-18"
            htmlType="submit"
            loading={user.loading}
          >
            Sign In
          </Button>
        </Form>
        {/* <Button
          type="default"
          onClick={onSignInWithGoogle}
          className={`${style.googleSign} font-weight-bold font-size-18 text-dark btn btn-outline-light w-100 mb-3`}
          style={{
            backgroundImage: 'url(../../../../../../../resources/images/icons/google-logo.svg)',
          }}
        >
          Log in with Google
        </Button> */}
        <Button
          block
          type="danger"
          ghost
          size="large"
          icon="google"
          className={`${style.googleSign} font-weight-bold font-size-18 w-100 mb-3`}
          onClick={onSignInWithGoogle}
        >
          {/* <Icon type="google" theme="outlined" twoToneColor="#52c41a" /> */}
          Sign in with Google
        </Button>
        <div className="text-center">
          <Link to="/user/forgot-password" className="text-blue font-weight-bold font-size-18">
            Forgot password?
          </Link>
        </div>
      </div>
      <div className="text-center font-size-18 pt-4 mb-auto">
        <span className="mr-2">Don&apos;t have an account?</span>
        <Link to="/user/register" className="font-weight-bold text-blue text-underlined">
          <u>Sign Up</u>
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

export default Form.create({ name: 'normal_login' })(Login)
