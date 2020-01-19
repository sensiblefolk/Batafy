import React from 'react'
import ReactDOM from 'react-dom'
import { createBrowserHistory } from 'history'

import {
  ApolloClient,
  concat,
  split,
  getMainDefinition,
  // ApolloLink,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client'
import { WebSocketLink } from 'apollo-link-ws'
import { setContext } from 'apollo-link-context'

import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
// import { logger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware } from 'connected-react-router'

import reducers from './redux/reducers'
import sagas from './redux/sagas'
import Localization from './localization'
import Router from './router'
import getToken from './services/token'
// import * as serviceWorker from './serviceWorker'

// app styles
import './global.scss'

// middlewared
const history = createBrowserHistory()
const sagaMiddleware = createSagaMiddleware()
const routeMiddleware = routerMiddleware(history)
const middlewares = [sagaMiddleware, routeMiddleware]
// if (process.env.NODE_ENV === 'development') {
//   middlewares.push(logger)
// }
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers(history), composeEnhancers(applyMiddleware(...middlewares)))
sagaMiddleware.run(sagas)

const httpLink = new HttpLink({ uri: `${process.env.REACT_APP_WEBURL}/v1/graphql` })

const wsLink = new WebSocketLink({
  uri: `${process.env.REACT_APP_WSURL}/v1/graphql`,
  options: {
    reconnect: true,
    connectionParams: {
      headers: async () => {
        const token = await getToken()
        console.log('token', token)
        const isSignedIn = token ? { Authorization: `Bearer ${token}` } : {}
        return isSignedIn
      },
    },
  },
})

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = await getToken()
  // console.log('token', token)
  // return the headers to the context so httpLink can read them
  if (token) {
    return {
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
    }
  }

  return {
    headers: {
      ...headers,
    },
  }
})

// using the ability to split links
const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query)
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
  },
  wsLink,
  concat(authLink, httpLink),
)

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <Localization>
        <Router history={history} />
      </Localization>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister()
export { store, history }
