import React from 'react'
// import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import styles from './style.module.scss'

import AuthButton from '../../../utility/AuthButton'

const mapStateToProps = ({ settings, user }) => ({
  isMobile: settings.isMobileView,
  user,
})

@connect(mapStateToProps)
class ProfileMenu extends React.Component {
  render() {
    const { isMobile } = this.props
    //
    return (
      <>
        {isMobile && (
          <AuthButton {...this.props} size="1.4rem" displayName={false} style={styles} />
        )}
      </>
    )
  }
}

export default ProfileMenu
