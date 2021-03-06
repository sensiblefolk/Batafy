import React from 'react'
import { FormattedMessage } from 'react-intl'

class Status extends React.Component {
  render() {
    return (
      <div>
        <FormattedMessage id="topBar.status" />
        <span className="ml-2 p-1 badge bg-danger text-white font-size-12 text-uppercase">
          Trialing
        </span>
      </div>
    )
  }
}

export default Status
