import Navigo from 'navigo'
import Promise from 'promise-polyfill'
import reduxMixin from 'riot-redux-mixin'
import reducer, { initialState } from './store/reducer.js'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { mixin, mount } from 'riot'
import './index.tag'
// add fetch polyfill
import 'whatwg-fetch'

const router = new Navigo(null, true, '#!')
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

// apply Promise polyfill
if (!window.Promise) {
  window.Promise = Promise
}

mixin('redux', reduxMixin(store))
mixin('router', { router })
mount('index', {
  inMaintenance: process.env.maintenance
})
