import React from 'react'
import { Helmet } from 'react-helmet'
import Cart from 'components/view/Cart'

const CartTitle = () => {
  return (
    <div>
      <Helmet title="Complete Transactions" />
      <Cart />
    </div>
  )
}

export default CartTitle
