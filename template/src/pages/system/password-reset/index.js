import React from 'react'
import { Helmet } from 'react-helmet'
import PasswordReset from 'components/system/Auth/PasswordReset'

const SystemPasswordReset = () => {
  return (
    <div>
      <Helmet title="Reset Password" />
      <PasswordReset />
    </div>
  )
}

export default SystemPasswordReset
