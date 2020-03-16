import React from 'react'
import { Helmet } from 'react-helmet'
import CheckOut from 'components/view/CheckOut'

const CheckOutTitle = () => {
  return (
    <div>
      <Helmet title="Complete Transactions" />
      <CheckOut />
    </div>
  )
}

export default CheckOutTitle
