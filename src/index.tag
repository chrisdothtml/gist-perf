<index>
  <virtual data-is="maintenance" if="{ opts.inMaintenance }" />
  <virtual data-is="app" if="{ !opts.inMaintenance }" />

  <script>
    import './tags/app/app.tag'
    import './tags/maintenance/maintenance.tag'
    import './index.styl'
  </script>
</index>
