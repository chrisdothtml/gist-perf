<gist-form>
  <div class="card card__float">

    <form class="gist-form" action="#" autocomplete="off" onsubmit="{ onSubmit }">
      <input id="gist-id" type="text" placeholder="Enter your gist ID" oninput="{ onInput }" />
      <button disabled="{ isDisabled }">Find</button>
    </form>

    <a class="help-link" href="https://github.com/chrisdothtml/gist-perf/blob/master/docs.md#how-it-works" target="_blank">View the docs</a>
  </div>

  <script>
    this.isDisabled = true

    // use router mixin
    this.mixin('router')

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
