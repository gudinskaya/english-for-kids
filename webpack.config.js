/* eslint-disable security/detect-unsafe-regex */
const NODE_ENV = process.env.NODE_ENV || 'development'
const webpack = require('webpack')
const path = require('path')
const RemoveWebpackPlugin = require('remove-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const isDevServer = Boolean(process.argv.find(v => v.includes('webpack-dev-server')))

console.log('Webpack dev server', isDevServer ? 'enabled' : 'disabled')

if (isDevServer) {
  console.log('Listening on http://localhost:8080')
}

const postCssLoader = [
  'css-loader?modules',
  '&importLoaders=1',
  '&localIdentName=[name]__[local]___[hash:base64:5]',
  '&disableStructuralMinification',
]

const getEntry = () => {
  if (isDevServer) {
    return [
      'babel-polyfill',
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      './src/index.js',
    ]
  }
  return {
    index: './src/index.js',
  }
}

const getLoader = (loader, localPath) => (isDevServer
  ? `${loader}${localPath}`
  : `${loader}static/${localPath}`)

const config = {
  context: __dirname,
  devtool: 'eval',
  entry: getEntry(),
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.jsx?$/,
        use: [ 'babel-loader' ],
      }, {
        test: /\.p?css$/,
        use: isDevServer
          ? [
            'style-loader?sourceMap',
            postCssLoader.join(''),
            'sass-loader',
            'postcss-loader',
          ]
          : ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              postCssLoader.join(''),
              'sass-loader',
              'postcss-loader',
            ].join('!'),
          }),
      }, {
        loader: getLoader('file-loader?name=', 'images/[hash].[ext]'),
        test: /\.(png|jpg|gif|svg)$/,
      }, {
        loader: getLoader('file-loader?name=', 'fonts/[hash].[ext]'),
        test: /fonts\/[^.]+\.(ttf|eot|svg|woff(2)?|otf)(\?[a-z0-9]+)?$/,
      },
    ],
  },
  output: {
    filename: isDevServer ? 'js/[name].js' : 'static/js/[name].js',
    path: path.join(__dirname, './dist'),
    publicPath: isDevServer ? 'http://localhost:8080/' : 'https://rolling-scopes-school.github.io/gudinskaya-JS2020Q3/english-for-kids/',
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({

    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/img', to: 'static/img' },
        { from: 'src/audio', to: 'static/audio' },
      ],
    }),
    new HtmlWebpackPlugin({
      inject: isDevServer,
      template: isDevServer ? './src/index.hot.html' : './src/index.html',
    }),
  ],
  resolve: {
    alias: {
      '@helpers': path.join(__dirname, 'src', 'helpers'),
      '@components': path.join(__dirname, 'src', 'components'),
      '@images': path.join(__dirname, 'src', 'img'),
    },
    extensions: [ '.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx' ],
    modules: [
      path.resolve(__dirname, 'node_modules'),
      __dirname,
    ],
  },
}

if (!isDevServer) {
  config.plugins = [
    new RemoveWebpackPlugin('./dist', 'hide'),
    new ExtractTextPlugin({ filename: 'static/css/styles.css', ignoreOrder: true }),
  ].concat(config.plugins)
}

if (isDevServer) {
  config.plugins.unshift(new webpack.NamedModulesPlugin())
  config.plugins.unshift(new webpack.HotModuleReplacementPlugin())

  config.devServer = {
    compress: true,
    contentBase: path.resolve('./dist'),
    // Need historyApiFallback to be able to refresh on dynamic route
    historyApiFallback: { disableDotRule: true },
    hot: true,
    port: 8080,
  }

  config.watch = true
}

if (NODE_ENV === 'production' && !isDevServer) {
  postCssLoader.splice(1, 1) // drop human readable names

  config.optimization = {
    minimizer: [
      // we specify a custom UglifyJsPlugin here to get source maps in production
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: false,
          ecma: 6,
          mangle: true
        },
        sourceMap: true
      })
    ]
  }
  // config.plugins.push(new webpack.optimize.UglifyJsPlugin({
  //   compress: {
  //     drop_console: true,
  //     unsafe: true,
  //     warnings: false,
  //   },
  // }))
}


module.exports = config
