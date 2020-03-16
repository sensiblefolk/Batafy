import React from 'react'
import { Helmet } from 'react-helmet'
import ProductList from 'components/view/Product/ProductList'

const ProductListTitle = () => {
  return (
    <div>
      <Helmet title="Product List" />
      <ProductList />
    </div>
  )
}

export default ProductListTitle
