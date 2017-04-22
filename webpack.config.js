const ExtractTextPlugin = require('extract-text-webpack-plugin')
const { join } = require('path')

function abs (dest) {
  return join(__dirname, dest)
}

module.exports = {
  entry: abs('src/index.js'),
  output: {
    filename: 'app.js',
    path: abs('assets')
  },
  module: { rules: [
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
      use: ExtractTextPlugin.extract({
        use: ['css-loader', 'stylus-loader']
      })
    }
  ]},
  externals: {
    riot: 'riot'
  },
  plugins: [
    new ExtractTextPlugin('app.css')
  ]
}
