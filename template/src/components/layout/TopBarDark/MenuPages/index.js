import React from 'react'
import { connect } from 'react-redux'
import { Menu, Dropdown } from 'antd'
import { Link } from 'react-router-dom'
import styles from './style.module.scss'

const mapStateToProps = ({ menu }) => ({
  menuData: menu.menuData,
})

@connect(mapStateToProps)
class MenuPages extends React.Component {
  menu = () => {
    const { menuData = [] } = this.props
    return (
      <Menu selectable={false} mode="inline" style={{ width: 200 }}>
        {menuData.map(item => {
          if (!item.category && item.children) {
            return (
              <Menu.SubMenu
                title={
                  <span>
                    <i className={`${item.icon} mr-2`} />
                    {item.title}
                  </span>
                }
                key={item.key}
              >
                {item.children.map(subItem => {
                  return (
                    <Menu.Item key={subItem.key}>
                      <Link to={subItem.url}>{subItem.title}</Link>
                    </Menu.Item>
                  )
                })}
              </Menu.SubMenu>
            )
          }

          if (!item.category && item.url) {
            return (
              <Menu.Item key={item.key}>
                <Link to={item.url}>
                  <i className={`${item.icon} mr-2`} />
                  {item.title}
                </Link>
              </Menu.Item>
            )
          }

          return null
        })}
      </Menu>
    )
  }

  render() {
    return (
      <Dropdown overlay={this.menu} trigger={['click']} placement="bottomLeft">
        <div className={styles.dropdown}>
          <i className={`${styles.icon} fe fe-menu`} />
          Pages
        </div>
      </Dropdown>
    )
  }
}

export default MenuPages
