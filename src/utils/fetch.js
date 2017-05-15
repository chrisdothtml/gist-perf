export function fetchJSON (url, options = {}) {
  return fetch(url, options)
    .then(
      response => response.json(),
      error => { throw error }
    )
}
