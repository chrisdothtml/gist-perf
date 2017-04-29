// Promise and fetch polyfills
import Promise from 'promise-polyfill'
import 'whatwg-fetch'

if (!window.Promise) window.Promise = Promise

export function fetchJSON (url, options = {}) {
  return fetch(url, options)
    .then(
      response => response.json(),
      error => { throw error }
    )
}
