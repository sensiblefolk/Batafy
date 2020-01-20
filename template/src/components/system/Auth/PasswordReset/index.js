import React, { useState } from 'react'
import { history } from 'index'
import { useDispatch } from 'react-redux'
import { Form, Input, Button } from 'antd'
import { Link } from 'react-router-dom'
import style from '../style.module.scss'

const PasswordReset = props => {
  const { form } = props
  const searchParams = history.location.search || ''

  const dispatch = useDispatch()
  const [confirmDirty, setConfirmDirty] = useState(false)

  const onSubmit = event => {
    event.preventDefault()
    form.validateFields((error, values) => {
      if (!error) {
        dispatch({
          type: 'user/PASSWORD_RESET',
          payload: { password: values.password, query: searchParams },
        })
      }
    })
  }

  const handleConfirmBlur = e => {
    const { value } = e.target
    // this.setState(({ confirmDirty }) => confirmDirty || !!value)
    setConfirmDirty(state => state.confirmDirty || !!value)
  }

  const compareToFirstPassword = (rule, value, callback) => {
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!')
    } else {
      callback()
    }
  }

  const validateToNextPassword = (rule, value, callback) => {
    if (value && confirmDirty) {
      form.validateFields(['confirm'], { force: true })
    }
    callback()
  }

  return (
    <div className={style.auth}>
      <div className="pt-5 pb-5 d-flex align-items-end mt-auto">
        <img src="../../../../resources/images/batafy-logo.png" alt="BATAFY Logo" />
      </div>
      <div className={`${style.container} pl-5 pr-5 pt-5 pb-5 bg-white`}>
        <div className="text-dark font-size-30 mb-4 text-center">Reset Password</div>
        <Form layout="vertical" hideRequiredMark onSubmit={onSubmit} className="mb-4">
          <Form.Item hasFeedback>
            {form.getFieldDecorator('password', {
              rules: [
                { required: true, message: 'Please input your password' },
                { validator: validateToNextPassword },
              ],
            })(<Input.Password size="large" placeholder="Password" />)}
          </Form.Item>
          <Form.Item hasFeedback>
            {form.getFieldDecorator('confirm', {
              rules: [
                { required: true, message: 'Please confirm your password' },
                { validator: compareToFirstPassword },
              ],
            })(
              <Input.Password
                size="large"
                placeholder="Confirm Password"
                onBlur={handleConfirmBlur}
              />,
            )}
          </Form.Item>
          <Button
            type="button"
            htmlType="submit"
            size="large"
            className="text-center btn btn-success w-100 font-weight-bold font-size-18"
          >
            Reset Password
          </Button>
        </Form>
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

export default Form.create({ name: 'password_reset' })(PasswordReset)
