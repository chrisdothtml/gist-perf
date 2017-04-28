<gist-compare>
  <div class="gist-compare" if="{ !!gist_info }">

    <div class="compare-heading">
      <h1>{ gist_info.raw.description || lang.gist.defaults.title }</h1>
      <button class="btn btn__green" onclick="{ runTests }">Run tests</button>
    </div>

    <hr />

    <ul class="files">
      <li if="{ gist_info.config }">
        <virtual
          data-is="code-block"
          title="{ gist_info.config.filename }"
          body="{ gist_info.config.highlighted }"
          language="json"
        />
      </li>
      <li if="{ gist_info.setup }">
        <virtual
          data-is="code-block"
          title="{ gist_info.setup.filename }"
          body="{ gist_info.setup.highlighted }"
          language="javascript"
        />
      </li>
      <li each="{ test in gist_info.tests }">
        <virtual
          data-is="code-block"
          title="{ test.filename }"
          body="{ test.highlighted }"
          language="javascript"
        />
      </li>
    </ul>
  </div>

  <script>
    import lang from '../../lang.json'
    import * as suite from '../../benchmark-suite.js'
    import { highlightCode } from './gist-compare.js'
    import { gist_info } from '../../store/selectors.js'
    import '../code-block/code-block.tag'
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

    runTests () {
      console.log('run suite')
    }
  </script>
</gist-compare>
