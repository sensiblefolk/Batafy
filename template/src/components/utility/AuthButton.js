import React from 'react'
import { Menu, Button, Dropdown, Icon } from 'antd'
import { history } from 'index'
// import classNames from 'classnames'

const AuthButton = props => {
  const { user, style, size = '1rem' } = props
  const userName = user.name ? user.name.split(' ') : ''
  const { displayName = true } = props

  const signInMenuDisplay = () => {
    if (!user.authorized) {
      return (
        <Menu style={{ width: '15rem' }}>
          <Menu.Item key="0">
            <Button type="danger" onClick={() => history.push('/user/register')} block>
              CREATE AN ACCOUNT
            </Button>
          </Menu.Item>
          <Menu.Item key="1">
            <Button type="default" onClick={() => history.push('/user/login')} block>
              Sign In
            </Button>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="2">
            <Icon type="user" />
            &nbsp;&nbsp; Account
          </Menu.Item>
          <Menu.Item key="3">
            <i className="lnr lnr-store" />
            &nbsp;&nbsp;&nbsp; Orders
          </Menu.Item>
        </Menu>
      )
    }

    const logOut = e => {
      e.preventDefault()
      const { dispatch } = props
      dispatch({
        type: 'user/LOGOUT',
      })
    }

    return (
      <Menu style={{ width: '15rem' }}>
        <Menu.Item key="2">
          <Icon type="user" />
          &nbsp;&nbsp; Account
        </Menu.Item>
        <Menu.Item key="3">
          <i className="lnr lnr-store" />
          &nbsp;&nbsp;&nbsp; Orders
        </Menu.Item>
        <Menu.Item key="5" style={{ padding: '1rem' }}>
          <Button
            type="dotted"
            className="btn btn-outline-danger"
            icon="poweroff"
            onClick={logOut}
            block
          >
            Log Out
          </Button>
        </Menu.Item>
      </Menu>
    )
  }

  return (
    <Dropdown overlay={signInMenuDisplay()} placement="bottomRight">
      <div
        className={'ant-dropdown-link' && style.air__menuTop__link}
        style={{ cursor: 'pointer' }}
      >
        <Icon type="user" style={{ fontSize: `${size}` }} />
        {user.authorized && displayName && (
          <>&nbsp; {userName[0] ? `Hello ${userName[0]}` : 'Account'} &nbsp;</>
        )}
        {!user.authorized && displayName && <>&nbsp; Account</>}
        <Icon type="down" />
      </div>
    </Dropdown>
  )
}

export default AuthButton
