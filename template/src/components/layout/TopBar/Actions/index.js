import React from 'react'
// import { FormattedMessage } from 'react-intl'
import { Dropdown, Button, Badge } from 'antd'
import List2 from 'components/widgets/Lists/2'
import styles from './style.module.scss'

class Notifications extends React.Component {
  render() {
    const menu = (
      <React.Fragment>
        <div className="card air__utils__shadow width-350">
          <div className="card-body p-0">
            <List2 />
          </div>
        </div>
      </React.Fragment>
    )
    return (
      <Dropdown overlay={menu} placement="bottomRight">
        <Badge count={1}>
          <Button type="primary" shape="circle" icon="bell" ghost className={`${styles.icon}`} />
        </Badge>
      </Dropdown>
    )
  }
}

export default Notifications
