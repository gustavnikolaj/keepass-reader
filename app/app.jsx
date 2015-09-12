import React from 'react'
import Application from './components/Application.jsx'
import ipc from 'ipc'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { Provider } from 'react-redux'

import fetchPasswordList from './actions/fetchPasswordList'
import requestPath from './actions/requestPath'

const loggerMiddleware = createLogger({
  collapsed: true,
  predicate: (getState, action) => action.type !== 'AUTH_REMOVE_TOKEN'
})

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware, // lets us dispatch() functions
  loggerMiddleware // neat middleware that logs actions
)(createStore)

import reducer from './reducer'

let store = createStoreWithMiddleware(reducer)
store.dispatch(requestPath(function () {
  store.dispatch(fetchPasswordList())
}))

let rootElement = document.getElementById('application')

React.render(
  <Provider store={store}>
    {() => <Application />}
  </Provider>,
  rootElement
)
