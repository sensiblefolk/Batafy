export default async function getMenuData() {
  return [
    {
      category: true,
      title: 'Products',
    },
    {
      title: 'Category',
      key: 'category',
      icon: 'fe fe-align-left',
      children: [
        {
          title: 'Orders',
          key: 'productOrders',
          url: 'product/orders',
          children: [
            {
              title: 'Dashboard',
              key: 'ecommerceDashboard',
              url: '/ecommerce/dashboard',
            },
            {
              title: 'Orders',
              key: 'ecommerceOrders',
              url: '/ecommerce/orders',
            },
          ],
        },
        {
          title: 'Propduct Catalog',
          key: 'productProductCatalog',
          url: '/product/product-catalog',
        },
        {
          title: 'Product Details',
          key: 'productProductDetails',
          url: '/product/product-details',
        },
        {
          title: 'Cart',
          key: 'productCart',
          url: '/product/cart',
        },
      ],
    },
  ]
}
