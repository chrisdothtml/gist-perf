const BrowserSync = require('browser-sync-webpack-plugin')
const ExtractCSSPlugin = require('mini-css-extract-plugin')
const { join } = require('path')
const { DefinePlugin } = require('webpack')
const { stringify } = JSON

function abs (dest) {
  return join(__dirname, dest)
}

module.exports = webpackEnv => {
  return {
    stats: 'minimal',
    entry: {
      main: abs('src/index.js')
    },
    output: {
      filename: '[name].js',
      path: abs('assets')
    },
    module: {
      rules: [
        {
          test: /\.tag$/,
          loader: 'riot-tag-loader',
          enforce: 'pre'
        }, {
          test: /\.(js|tag)$/,
          loader: 'babel-loader',
          exclude: /(node_modules)/
        }, {
          test: /\.styl$/,
          use: [
            ExtractCSSPlugin.loader,
            'css-loader',
            'stylus-loader'
          ]
        }
      ]
    },
    externals: {
      benchmark: 'Benchmark',
      prism: 'Prism'
    },
    plugins: [
      new ExtractCSSPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
      }),
      new DefinePlugin({
        // yarn <script> -- --env=m
        'process.env.maintenance': stringify(webpackEnv === 'm')
      }),
      new BrowserSync({
        host: 'localhost',
        port: 1337,
        server: { baseDir: ['.'] },
        open: false,
        notify: false
      })
    ],
    node: {
      Buffer: false,
      global: false
    }
  }
}
