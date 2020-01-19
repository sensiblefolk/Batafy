import React from 'react'
import { Form, Input, Button } from 'antd'
import { Link } from 'react-router-dom'
import style from '../style.module.scss'

@Form.create()
class Lockscreen extends React.Component {
  onSubmit = event => {
    event.preventDefault()
    const { form } = this.props
    form.validateFields((error, values) => {
      if (!error) {
        console.log(values)
      }
    })
  }

  render() {
    const { form } = this.props

    return (
      <div className={style.auth}>
        <div className="pt-5 pb-5 d-flex align-items-end mt-auto">
          <img src="../../../../resources/images/batafy-logo-black.png" alt="Batafy Logo" />
          {/* <div className="air__utils__logo__text">
            <div className="air__utils__logo__name text-uppercase text-dark font-size-21">
              AIR UI
            </div>
            <div className="air__utils__logo__descr text-uppercase font-size-12 text-gray-6">
              Admin template
            </div>
          </div> */}
        </div>
        <div className={`${style.container} pl-5 pr-5 pt-5 pb-5 bg-white text-center`}>
          <div className="text-dark font-size-30 mb-4">Account Locked</div>
          <div className="air__utils__avatar air__utils__avatar--size64 d-inline-block mb-2">
            <img src="../../../../resources/images/avatars/2.jpg" alt="Mary Stanform" />
          </div>
          <div className="font-weight-bold font-size-18 text-dark mb-4">Mary Stanform</div>
          <Form layout="vertical" hideRequiredMark onSubmit={this.onSubmit} className="mb-4">
            <Form.Item>
              {form.getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your password' }],
              })(<Input size="large" placeholder="Password" />)}
            </Form.Item>
            <Button
              type="button"
              htmlType="submit"
              size="large"
              className="text-center btn btn-success w-100 font-weight-bold font-size-18"
            >
              Log In
            </Button>
          </Form>
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
}

export default Lockscreen
