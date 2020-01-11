import React from 'react'
// import { FormattedMessage } from 'react-intl'
import { Dropdown, Icon, Badge } from 'antd'
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
      <Dropdown overlay={menu} placement="bottomCenter">
        {/* <Badge count={1}>
          <Button type="link" shape="circle" icon="bell" className={`${styles.icon}`} />
        </Badge> */}
        <Badge count={2} style={{ backgroundColor: '#f00' }}>
          <Icon
            className={`${styles.air__menuTop__icon}`}
            type="bell"
            style={{ fontSize: '1.5rem' }}
          />
        </Badge>
      </Dropdown>
    )
  }
}

export default Notifications
