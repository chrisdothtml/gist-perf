import Navigo from 'navigo'
import reducer, { initialState } from './store/reducer.js'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import reduxMixin from 'riot-redux-mixin'
import { createStore, applyMiddleware } from 'redux'
import { mixin, mount } from 'riot'
import './tags/app/app.tag'
import './index.styl'

const router = new Navigo(null, true, '#!')
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

mixin('redux', reduxMixin(store))
mixin('router', { router })
mount('app')
