import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import Switch from 'react-router-transition-switch'
import Loadable from 'react-loadable'
import { connect } from 'react-redux'

import Layout from 'layouts'
import Loader from 'components/layout/Loader'
import NotFoundPage from 'pages/system/404'

const loadable = loader =>
  Loadable({
    loader,
    delay: false,
    loading: () => <Loader fullScreen />,
  })

export const routes = [
  // Dashboards
  {
    path: '/home',
    Component: loadable(() => import('pages/dashboard/analytics')),
    exact: true,
  },

  // products
  {
    path: '/product/search',
    Component: loadable(() => import('pages/product/search-product')),
    exact: true,
  },
  {
    path: '/product/list',
    Component: loadable(() => import('pages/product/product-list')),
    exact: true,
  },
  {
    path: '/product/detail/:details',
    Component: loadable(() => import('pages/product/product-detail')),
    exact: true,
  },
  {
    path: '/product/new',
    Component: loadable(() => import('pages/product/new-product')),
    exact: true,
  },

  // Complete Purchase
  {
    path: '/cart',
    Component: loadable(() => import('pages/cart')),
    exact: true,
  },
  {
    path: '/check_out',
    Component: loadable(() => import('pages/checkout')),
    exact: true,
  },

  // System Pages
  {
    path: '/user/login',
    Component: loadable(() => import('pages/system/login')),
    exact: true,
  },
  {
    path: '/user/forgot-password',
    Component: loadable(() => import('pages/system/forgot-password')),
    exact: true,
  },
  {
    path: '/user/password-reset',
    Component: loadable(() => import('pages/system/password-reset')),
    exact: true,
  },
  {
    path: '/user/register',
    Component: loadable(() => import('pages/system/register')),
    exact: true,
  },
  {
    path: '/system/lockscreen',
    Component: loadable(() => import('pages/system/lockscreen')),
    exact: true,
  },
  {
    path: '/system/404',
    Component: loadable(() => import('pages/system/404')),
    exact: true,
  },
  {
    path: '/system/500',
    Component: loadable(() => import('pages/system/500')),
    exact: true,
  },
]

const mapStateToProps = ({ settings }) => ({ settings })

class Router extends React.Component {
  render() {
    const {
      history,
      settings: { routerAnimation },
    } = this.props
    return (
      <ConnectedRouter history={history}>
        <Layout>
          <Switch
            render={props => {
              const {
                children,
                location: { pathname },
              } = props
              return (
                <SwitchTransition>
                  <CSSTransition
                    key={pathname}
                    classNames={routerAnimation}
                    timeout={routerAnimation === 'none' ? 0 : 300}
                  >
                    {children}
                  </CSSTransition>
                </SwitchTransition>
              )
            }}
          >
            <Route exact path="/" render={() => <Redirect to="/home" />} />
            {routes.map(({ path, Component, exact }) => (
              <Route path={path} key={path} exact={exact}>
                <Component />
              </Route>
            ))}
            <Route component={NotFoundPage} />
          </Switch>
        </Layout>
      </ConnectedRouter>
    )
  }
}

export default connect(mapStateToProps)(Router)
