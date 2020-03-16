import React from 'react'
import { Helmet } from 'react-helmet'
import NewProduct from 'components/view/Product/NewProduct'

const NewProductTitle = () => {
  return (
    <div>
      <Helmet title="Add new product" />
      <NewProduct />
    </div>
  )
}

export default NewProductTitle
