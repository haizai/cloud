var path = require('path')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer')
var CleanWebpackPlugin = require('clean-webpack-plugin')

var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

module.exports = {
	devtool:'eval-source-map',
	entry: ['./server/src/index.js',hotMiddlewareScript],
	output:{
    path: path.resolve(__dirname, './server/public/js/index'),
    publicPath:'/',
    filename: 'index.bundle.js'
	},

  module:{
    loaders: [
      // {
      //   test: /.css$/,
      //   loaders: ["style-loader", "css-loader", "postcss-loader"]
      // },
      {
        test:/\.scss$/,
        loaders: ["style-loader", "css-loader", "sass-loader", "postcss-loader"]
      },
    ]
  },
  
  postcss:[autoprefixer({browsers:['> 5%']})],

	devServer: {
    historyApiFallback: true,
    noInfo: true
	},

  plugins: [
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
  ]
}


// npm run build
if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  module.exports.entry = './server/src/index.js'
  module.exports.plugins = [
    new CleanWebpackPlugin(['public']),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
  ] 
}
