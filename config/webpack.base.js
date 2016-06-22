import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import autoprefixer from 'autoprefixer'
import path from 'path'

export default {
  entry: [
    './src/client/dev.js',
    './src/client/index.js'
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.less'],
    fallback: [path.join(__dirname, '../node_modules')]
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.css?$/,
        loader: 'style!css?sourceMap!postcss'
      },
      {
        test: /\.less?$/,
        loader: 'style!css?sourceMap!postcss!less?sourceMap&strictMath'
      },
      {
        test: /\.(svg|woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000
        }
      }
    ]
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  postcss: () => [autoprefixer({browsers: ['> 1%']})],
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin()
  ]
}
