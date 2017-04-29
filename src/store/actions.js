import parseGist from '../parse-gist.js'

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
    // fetch(`https://api.github.com/gists/${id}`)
    fetch(`/mocks/gists/${id}.json`)
      .then(response => response.json(), error => { throw error })
      .then(data => {
        const gist = parseGist(data)

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
