const BrowserSync = require('browser-sync-webpack-plugin')
const ExtractText = require('extract-text-webpack-plugin')
const { join } = require('path')
const { DefinePlugin: Define } = require('webpack')
const { stringify } = JSON

function abs (dest) {
  return join(__dirname, dest)
}

module.exports = webpackEnv => {
  return {
    stats: 'minimal',
    entry: abs('src/index.js'),
    output: {
      filename: 'app.js',
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
          use: ExtractText.extract({
            use: ['css-loader', 'stylus-loader']
          })
        }
      ]
    },
    externals: {
      benchmark: 'Benchmark',
      prism: 'Prism'
    },
    plugins: [
      new ExtractText('app.css'),
      new Define({
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
