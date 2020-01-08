import React from 'react'
import ReactDOM from 'react-dom'
import { createBrowserHistory } from 'history'

import {
  ApolloClient,
  concat,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client'

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
import * as serviceWorker from './serviceWorker'

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

const httpLink = new HttpLink({ uri: 'https://batafy.herokuapp.com/v1/graphql' })

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  const token = getToken()
  // console.log('token', token)
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : '',
      'x-hasura-admin-secret': 'A-0b56abcdef',
    },
  })

  return forward(operation)
})

const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
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
serviceWorker.unregister()
export { store, history }
