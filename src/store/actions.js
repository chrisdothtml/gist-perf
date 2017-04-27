import parseGist from '../parse-gist.js'
import { get } from 'axios'

export function updateView (view) {
  return { type: 'updateView', data: { view }}
}

export function updateLoading (isLoading) {
  return { type: 'updateLoading', data: { isLoading }}
}

export function updateGist (data) {
  return { type: 'updateGist', data }
}

export function fetchGist (id) {
  return dispatch => {
    get(`https://api.github.com/gists/${id}`)
      .then(response => {
        const gist = parseGist(response.data)

        if (gist.errors.length) {
          console.error('invalid gist', gist.errors)
        } else {
          dispatch(updateGist({ info: gist }))
          dispatch(updateView('compare'))
        }

        dispatch(updateLoading(false))
      })
      .catch(error => {
        console.error('unable to get gist', error)
        dispatch(updateLoading(false))
      })
  }
}
