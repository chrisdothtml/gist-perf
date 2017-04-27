<gist-compare>
  <virtual if="{ !!gist_info }">
    <h1>Comparing gist: { gist_info.raw.id }</h1>
  </virtual>

  <script>
    import { gist_info } from '../../store/selectors.js'

    // mixins
    this.mixin('redux')
    // store listeners
    this.subscribe(gist_info)
  </script>
</gist-compare>
