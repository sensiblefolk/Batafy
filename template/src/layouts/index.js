import React, { Fragment } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
import { Helmet } from 'react-helmet'
import Loader from 'components/layout/Loader'
import PublicRoutes from 'publicRoutes'
import PublicLayout from './Public'
import AuthLayout from './Auth'
import AppLayout from './App'

const Layouts = {
  public: PublicLayout,
  auth: AuthLayout,
  app: AppLayout,
}

class Layout extends React.PureComponent {
  previousPath = ''

  currentRoute = ''

  componentDidMount() {
    const {
      location: { pathname },
    } = this.props
    this.currentRoute = this.isPublicRoute(pathname)
  }

  componentDidUpdate(prevProps) {
    const {
      location: { pathname },
    } = this.props
    const {
      location: { pathname: prevPathname },
    } = prevProps
    if (pathname !== prevPathname) {
      window.scrollTo(0, 0)
      // this.isPublicRoute(pathname)
    }
  }

  isPublicRoute = path => {
    const currentPath = path ? path.split('/') : '/'
    const splitText = currentPath
    const foundRoute = PublicRoutes.find(route => route.path === splitText[1])
    return foundRoute
  }

  render() {
    const {
      children,
      location: { pathname, search },
      user,
    } = this.props

    // const { path: isPublic } = this.isPublicRoute(pathname)
    // const isPublic = !!path)

    // NProgress Management
    const currentPath = pathname + search
    if (currentPath !== this.previousPath) {
      NProgress.start()
    }

    setTimeout(() => {
      NProgress.done()
      this.previousPath = currentPath
    }, 300)

    // Layout Rendering
    const getLayout = () => {
      if (pathname === '/') {
        return 'public'
      }
      if (/^\/user(?=\/|$)/i.test(pathname)) {
        return 'auth'
      }
      return 'app'
    }

    const Container = Layouts[getLayout()]
    const isUserAuthorized = user.authorized
    const isUserLoading = user.loading
    const isAuthLayout = getLayout() === 'auth'

    const BootstrappedLayout = () => {
      // show loader when user in check authorization process, not authorized yet and not on login pages
      if (isUserLoading && !isUserAuthorized && !isAuthLayout) {
        return <Loader />
      }
      // redirect to login page if current is not login page and user not authorized
      if (!isAuthLayout && !isUserAuthorized && !this.currentRoute) {
        return <Redirect to={{ pathname: '/user/login', state: { from: pathname } }} />
      }

      // redirect to home page if current user is logged in and authorized
      if (isAuthLayout && isUserAuthorized) {
        return <Redirect to="/" />
      }

      // if (isPublic) {
      //   console.log('jumped in')
      //   return <Redirect to={currentPath} />
      // }
      // in other case render previously set layout
      return <Container>{children}</Container>
    }

    return (
      <Fragment>
        <Helmet titleTemplate="Batafy | %s" title="social crowd bartering" />
        {BootstrappedLayout()}
      </Fragment>
    )
  }
}

export default withRouter(connect(({ user }) => ({ user }))(Layout))
