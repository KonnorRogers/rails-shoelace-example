const { environment } = require('@rails/webpacker')
const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const HoneybadgerSourceMapPlugin = require('@honeybadger-io/webpack')
const revision = process.env.GIT_COMMIT || 'master'

environment.plugins.append(
  'HoneybadgerSourceMap',
  new HoneybadgerSourceMapPlugin({
    apiKey: process.env.HONEYBADGER_API_KEY,
    // assetsUrl: process.env.ASSETS_URL,
    silent: false,
    ignoreErrors: false,
    revision: revision
  })
)

environment.plugins.append(
  'CopyPlugin',
  new CopyPlugin({
    patterns: [
      {
        from: path.resolve(
          __dirname,
          '../../node_modules/@shoelace-style/shoelace/dist/shoelace/icons'
        ),
        to: path.resolve(__dirname, '../../public/packs/js/icons')
      }
    ]
  })
)

module.exports = environment
