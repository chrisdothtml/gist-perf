<app>
  <virtual data-is="maintenance" if="{ opts.inMaintenance }" />
  <virtual data-is="gist-perf" if="{ !opts.inMaintenance }" />

  <script>
    import '../gist-perf/gist-perf.tag'
    import '../maintenance/maintenance.tag'
  </script>
</app>
