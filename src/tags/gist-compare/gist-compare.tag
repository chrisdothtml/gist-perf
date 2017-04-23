<gist-compare>
  <div class="contain">
    <div class="card">
      <h1>Getting gist { opts.data.id }...</h1>
    </div>
  </div>

  <script>
    import { get } from 'axios'
    import { parse } from './utils.js'

    getGist () {
      const gistId = (this.opts.data || {}).id

      if (gistId) {
        get(`https://api.github.com/gists/${gistId}`)
          .then(response => {
            const gist = parse(response.data)

            if (gist.errors.length) {
              console.error(gist.errors)
            } else {
              console.log(gist)
            }
          })
          .catch(error => {
            console.error('unable to get gist', error)
          })
      } else {
        console.error('no gist id')
      }
    }

    this.on('mount', this.getGist)
    this.on('update', this.getGist)
  </script>
</gist-compare>
