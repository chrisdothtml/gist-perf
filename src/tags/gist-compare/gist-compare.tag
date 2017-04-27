<gist-compare>
  <div class="gist-compare" if="{ !!gist_info }">
    <h1>{ gist_info.raw.description || lang.gist.defaults.title }</h1>

    <button onclick="{ run }">Run suite</button>

    <ul class="files">
      <li if="{ gist_info.config }">
        <h3>{ gist_info.config.filename }</h3>
        <pre><code class="language-json"><raw-html content="{ gist_info.config.highlighted }" /></code></pre>
      </li>
      <li if="{ gist_info.setup }">
        <h3>{ gist_info.setup.filename }</h3>
        <pre><code class="language-javascript"><raw-html content="{ gist_info.setup.highlighted }" /></code></pre>
      </li>
      <li each="{ test in gist_info.tests }">
        <h3>{ test.filename }</h3>
        <pre><code class="language-javascript"><raw-html content="{ test.highlighted }" /></code></pre>
      </li>
    </ul>
  </div>

  <script>
    import lang from '../../lang.json'
    import * as suite from '../../benchmark-suite.js'
    import { highlightCode } from './gist-compare.js'
    import { gist_info } from '../../store/selectors.js'
    import '../raw-html/raw-html.tag'
    import './gist-compare.styl'

    // mixins
    this.mixin('redux')

    this.on('mount', () => {
      this.lang = lang
    })

    this.subscribe(gist_info, data => {
      const { gist_info } = data

      if (gist_info) {
        this.suite = suite.create(gist_info)
        this.update({ gist_info })
      }
    })

    this.on('update', () => {
      this.gist_info = highlightCode(this.gist_info)
    })

    run () {
      console.log('run suite')
    }
  </script>
</gist-compare>
