import React from 'react'
import { Helmet } from 'react-helmet'
import ProductDetail from 'components/view/Product/ProductDetail'

const ProductDetailTitle = () => {
  return (
    <div>
      <Helmet title="Product Detail" />
      <ProductDetail />
    </div>
  )
}

export default ProductDetailTitle
