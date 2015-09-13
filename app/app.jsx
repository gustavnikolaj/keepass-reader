import React from 'react'
import Application from './components/Application.jsx'
import { Provider } from 'react-redux'

import { HotKeys } from 'react-hotkeys'

import fetchPasswordList from './actions/fetchPasswordList'
import requestPath from './actions/requestPath'

import reducer from './reducer'
import createStore from './lib/createStore'

let store = createStore(reducer)

store.dispatch(requestPath(function () {
  store.dispatch(fetchPasswordList())
}))

let rootElement = document.getElementById('application')

let globalKeyHandlers = {
  'esc': () => {
    if (process.env.MENUBAR) {
      console.log('close this window')
    }
  }
}

React.render(
  <Provider store={store}>
    {() =>
      <HotKeys keyMap={{}} handlers={ globalKeyHandlers }>
        <Application />
      </HotKeys>
    }
  </Provider>,
  rootElement
)
