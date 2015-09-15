import {
  createStore as createStoreRedux,
  /* combineReducers, */
  applyMiddleware
} from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

export default function createStore (reducer) {
  const loggerMiddleware = createLogger({
    collapsed: true,
    predicate: (getState, action) => action.type !== 'AUTH_REMOVE_TOKEN'
  })

  const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
  )(createStoreRedux)

  return createStoreWithMiddleware(reducer)
}
