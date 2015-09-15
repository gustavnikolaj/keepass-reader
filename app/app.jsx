import React from 'react'
import Application from './components/Application.jsx'
import { Provider } from 'react-redux'

import fetchPasswordList from './actions/fetchPasswordList'
import requestPath from './actions/requestPath'

import reducer from './reducer'
import createStore from './lib/createStore'

let store = createStore(reducer)

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
