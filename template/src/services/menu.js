export default async function getMenuData() {
  return [
    {
      title: 'Dashboard',
      key: 'dashboard',
      icon: 'fe fe-bookmark',
      url: '/dashboard/analytics',
    },
    {
      category: true,
      title: 'Products',
    },
    {
      title: 'Product',
      key: 'product',
      icon: 'fe fe-shopping-cart',
      children: [
        {
          title: 'Orders',
          key: 'productOrders',
          url: '/product/orders',
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
