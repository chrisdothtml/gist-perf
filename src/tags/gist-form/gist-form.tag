<gist-form>
  <form class="gist-form" action="#" autocomplete="off" onsubmit="{ onSubmit }">
    <input
      id="gist-id"
      type="text"
      placeholder="Enter your gist ID"
      value="{ gist_id }"
      oninput="{ onInput }"
      disabled="{ is_loading }"
    />
    <button
      class="btn { btn__loading: is_loading }"
      disabled="{ isDisabled || is_loading }"
    >Get</button>
  </form>

  <a class="help-link" href="https://github.com/chrisdothtml/gist-perf/blob/master/docs.md#how-it-works" target="_blank">View the docs</a>

  <script>
    import { fetchGist, updateLoading } from '../../store/actions.js'
    import { gist_id, is_loading } from '../../store/selectors.js'
    import './gist-form.styl'

    // mixins
    this.mixin('redux')
    this.mixin('router')

    this.on('mount', () => {
      this.isDisabled = true
    })

    this.subscribe(is_loading)
    this.subscribe(gist_id, data => {
      const { gist_id } = data
      let isDisabled = true

      if (gist_id) {
        isDisabled = false
        this.dispatch(updateLoading(true))
        this.dispatch(fetchGist(gist_id))
      }

      this.update({
        gist_id,
        isDisabled
      })
    })

    onInput (event) {
      this.isDisabled = !event.target.value.trim()
    }

    onSubmit (event) {
      const input = event.target.querySelector('#gist-id')
      const gistId = (input || {}).value

      if (gistId) {
        this.router.navigate(`/gist/${gistId}`)
      }

      event.preventDefault()
    }
  </script>
</gist-form>
