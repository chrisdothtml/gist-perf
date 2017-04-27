import { createSelector } from 'reselect'

export const gist_id = createSelector(
  state => state.gist.id,
  id => ({ gist_id: id })
)

export const gist_info = createSelector(
  state => state.gist.info,
  info => ({ gist_info: info })
)

export const is_loading = createSelector(
  state => state.isLoading,
  isLoading => ({ is_loading: isLoading })
)

export const current_view = createSelector(
  state => state.view,
  view => ({ current_view: view })
)
