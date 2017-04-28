<code-block>
  <div class="code-block">
    <span class="title" if="{ opts.title }">{ opts.title }</span>
    <pre><code ref="code" class="language-{ opts.language }"></code></pre>
  </div>

  <script>
    import './code-block.styl'

    this.on('mount', () => {
      this.refs.code.innerHTML = this.opts.body
    })
  </script>
</code-block>
