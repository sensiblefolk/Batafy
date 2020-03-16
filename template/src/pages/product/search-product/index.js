import React from 'react'
import { Helmet } from 'react-helmet'
import SearchProduct from 'components/view/Product/SearchProduct'

const SearchProductTitle = () => {
  return (
    <div>
      <Helmet title="Search Product" />
      <SearchProduct />
    </div>
  )
}

export default SearchProductTitle
