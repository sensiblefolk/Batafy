import React from 'react'
import Search from './Search'
// import IssuesHistory from './IssuesHistory'
import BataBalance from './Status'
// import LanguageSwitcher from './LanguageSwitcher'
import Notifications from './Actions'
import UserMenu from './UserMenu'
import style from './style.module.scss'

class TopBar extends React.Component {
  render() {
    return (
      <div className={style.topbar}>
        <div className="mr-md-8 mr-auto">
          <Search />
        </div>
        {/* <div className="mr-auto d-none d-md-block">
          <IssuesHistory />
        </div> */}
        <div className="mr-4 d-sm-block">
          <Notifications />
        </div>
        <div className="mb-0 mr-4 d-sm-block d-none">
          <BataBalance />
        </div>
        {/* <div className="mr-4 d-none d-sm-block">
          <LanguageSwitcher />
        </div> */}

        <div className="">
          <UserMenu />
        </div>
      </div>
    )
  }
}

export default TopBar
