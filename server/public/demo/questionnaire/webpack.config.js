var path = require('path')
var webpack = require('webpack')

module.exports = {
	devtool:'eval-source-map',
	entry:'./src/main.js',
	output:{
    path: path.resolve(__dirname, './public'),
    publicPath: '/public/',
    filename: 'build.js'
	},

	module:{
		loaders: [
			{
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
			},
			{
				test:/\.scss$/,
				loaders: ["style","css","sass"]				
			},
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.html$/,
        loader: 'vue-html'
      },
		]
	},
	devServer: {
    historyApiFallback: true,
    noInfo: true
	}
}

// 生产环境
if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ])
}
