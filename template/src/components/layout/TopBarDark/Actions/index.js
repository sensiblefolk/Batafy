import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Dropdown } from 'antd'
import List2 from 'components/widgets/Lists/2'
import styles from './style.module.scss'

class Actions extends React.Component {
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
      <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
        <div className={styles.dropdown}>
          <i className={`${styles.icon} fe fe-menu`} />
          <FormattedMessage id="topBar.actions" />
        </div>
      </Dropdown>
    )
  }
}

export default Actions
