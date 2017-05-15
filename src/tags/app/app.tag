<app>
  <a class="main-logo" href="#!" title="Gist Perf">
    <span>gp</span>
  </a>

  <div class="content { content__full: viewIs('compare') }">
    <div data-is="app-form" show="{ viewIs('form') }"></div>
    <div data-is="app-compare" show="{ viewIs('compare') }"></div>
  </div>

  <a class="github-link" href="https://github.com/chrisdothtml/gist-perf" title="View on Github" target="_blank">
    <i class="typcn typcn-social-github"></i>
  </a>

  <script>
    import { updateGist, updateView } from '../../store/actions.js'
    import { current_view } from '../../store/selectors.js'
    import '../app-compare/compare.tag'
    import '../app-form/form.tag'
    import './app.styl'

    // mixins
    this.mixin('redux')
    this.mixin('router')
    // store listeners
    this.subscribe(current_view)

    this.on('mount', () => {
      this.router
        .on({
          '/gist/:id': (params) => {
            this.dispatch(updateGist({ id: params.id }))
          },
          '*': () => {
            this.dispatch(updateGist({ id: null }))
            this.dispatch(updateView('form'))
          }
        })
        .resolve()
    })

    viewIs (view) {
      return this.current_view === view
    }
  </script>
</app>
