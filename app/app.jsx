import React from 'react'
import Application from './components/Application.jsx'
import ipc from 'ipc'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { Provider } from 'react-redux'
import { database } from './reducers/database'
import { passwordList } from './reducers/passwordList'

import fetchPasswordList from './actions/fetchPasswordList'

//ipc.on('passwordResponse', function (hasPassword) {
//  console.log('passwordResponse gotten')
//})

// function checkForPassword () {
//   ipc.send('passwordRequest')
// }
//
// window.addEventListener('focus', checkForPassword)
// window.addEventListener('load', checkForPassword)

const loggerMiddleware = createLogger({
  collapsed: true,
  predicate: (getState, action) => action.type !== 'AUTH_REMOVE_TOKEN'
})

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware, // lets us dispatch() functions
  loggerMiddleware // neat middleware that logs actions
)(createStore)

const reducer = combineReducers({
  database,
  passwordList
})

let store = createStoreWithMiddleware(reducer)

store.dispatch(fetchPasswordList())

let rootElement = document.getElementById('application')

React.render(
  <Provider store={store}>
    {() => <Application />}
  </Provider>,
  rootElement
)
