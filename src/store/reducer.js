const handlers = {
  updateGist (state, data) {
    const { id, info } = data
    let { gist } = state

    if (id !== undefined) {
      gist = { ...gist, id }
    } else if (info !== undefined) {
      gist = { ...gist, info }
    }

    return Object.assign(state, { gist })
  },

  updateLoading (state, data) {
    return Object.assign(state, {
      isLoading: data.isLoading
    })
  },

  updateView (state, data) {
    return Object.assign(state, {
      view: data.view
    })
  }
}

export default function (state, action) {
  const handler = handlers[action.type]
  let result = state

  if (handler) {
    result = handler(state, action.data)
  }

  return result
}

export const initialState = {
  gist: {
    id: null,
    info: null
  },
  isLoading: false,
  view: 'form'
}
