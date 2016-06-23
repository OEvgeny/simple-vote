import webpack from 'webpack'
import config from '../../config/webpack.base'
import express from 'express'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

import SocketIO from 'socket.io'

function startSocketIO () {
  // http server
  const compiler = webpack(config)
  const app = express()
  const devMiddleware = webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    stats: {
      colors: true,
      chunks: false
    }
  })
  const hotMiddleware = webpackHotMiddleware(compiler)

  app.use(devMiddleware)
  app.use(hotMiddleware)

  app.listen(8080, function (err) {
    if (err) {
      console.log(err)
      return
    }
    console.log('Listening at http://localhost:' + 8080 + '\n')
  })

  // socket.io server
  const io = new SocketIO().attach(8090)
  return io
}

const io = startSocketIO()
export default io
