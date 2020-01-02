import React from 'react'
import { Menu, Dropdown } from 'antd'
import { Link } from 'react-router-dom'
import styles from './style.module.scss'

class MenuDashboards extends React.Component {
  render() {
    const menu = (
      <Menu selectable={false}>
        <Menu.ItemGroup title="Dashboards">
          <Menu.Item>
            <Link to="/dashboard/analytics">
              <i className="fe fe-home mr-2" />
              Analytics
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/dashboard/statistics">
              <i className="fe fe-home mr-2" />
              Statistics
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/dashboard/ecommerce">
              <i className="fe fe-home mr-2" />
              Ecommerce
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/dashboard/crypto">
              <i className="fe fe-home mr-2" />
              Crypto
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/dashboard/crypto-terminal">
              <i className="fe fe-home mr-2" />
              Crypto Terminal
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/dashboard/jira">
              <i className="fe fe-home mr-2" />
              Jira
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/dashboard/helpdesk">
              <i className="fe fe-home mr-2" />
              Helpdesk
            </Link>
          </Menu.Item>
        </Menu.ItemGroup>
      </Menu>
    )
    return (
      <Dropdown overlay={menu} trigger={['click']} placement="bottomLeft">
        <div className={styles.dropdown}>
          <i className="fe fe-grid mr-2" />
          Dashboards
        </div>
      </Dropdown>
    )
  }
}

export default MenuDashboards
