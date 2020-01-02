import React from 'react'
import MenuDashboards from './MenuDashboards'
import MenuPages from './MenuPages'
import Status from './Status'
import LanguageSwitcher from './LanguageSwitcher'
import Actions from './Actions'
import UserMenu from './UserMenu'
import style from './style.module.scss'

class TopBarDark extends React.Component {
  render() {
    return (
      <div className={style.topbarDark}>
        <a
          href="#"
          onClick={e => e.preventDefault()}
          className={`${style.topbarDark__logo} d-none d-md-block`}
        >
          <img src="../../../../resources/images/air-logo.png" alt="Air UI" />
          <div className={style.topbarDark__logo__name}>AIR UI</div>
          <div className={style.topbarDark__logo__descr}>Admin Template</div>
        </a>
        <div className="mr-3 d-block">
          <MenuDashboards />
        </div>
        <div className="mr-auto d-block">
          <MenuPages />
        </div>
        <div className="mb-0 mr-4 d-xl-block d-none">
          <Status />
        </div>
        <div className="mr-4 d-none d-md-block">
          <LanguageSwitcher />
        </div>
        <div className="mr-4 d-none d-md-block">
          <Actions />
        </div>
        <div className="d-none d-md-block">
          <UserMenu />
        </div>
      </div>
    )
  }
}

export default TopBarDark
