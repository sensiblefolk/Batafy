import React from 'react'
import { withRouter } from 'react-router-dom'

class PublicLayout extends React.PureComponent {
  render() {
    const { children } = this.props
    return children
  }
}

export default withRouter(PublicLayout)
