<app>
  <a class="main-logo" href="#" title="Gist Perf">
    <span>gp</span>
  </a>

  <div data-is="{ routeTag }" data="{ routeData }"></div>

  <a class="github-link" href="https://github.com/chrisdothtml/gist-perf" title="View on Github" target="_blank">
    <i class="typcn typcn-social-github"></i>
  </a>

  <script>
    import '../gist-compare/gist-compare.tag'
    import '../gist-form/gist-form.tag'
    import './app.styl'

    this.on('mount', () => {
      this.router
        .on({
          '/gist/:id': (params) => {
            this.routeTag = 'gist-compare'
            this.routeData = { id: params.id }
            this.update()
          },
          '*': () => {
            this.routeTag = 'gist-form'
            this.routeData = null
            this.update()
          }
        })
        .resolve()
    })
  </script>
</app>
