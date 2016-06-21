import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import autoprefixer from 'autoprefixer'

export default {
  entry: [
    './src/client/dev.js',
    './src/client/index.js'
  ],
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
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
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
