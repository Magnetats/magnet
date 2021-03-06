const webpack = require('webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals')
const StartServerPlugin = require('start-server-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
	entry: ["webpack/hot/poll?1000", "./server/index"],
	watch: true,
	target: "node",
	externals: [
		nodeExternals({
			whitelist: ["webpack/hot/poll?1000"]
		})
	],
	resolve: {
		extensions: [".js", ".jsx"],
		alias: {
			"../../theme.config$": path.join(
				__dirname,
				"./client/src/styling/theme.config"
			)
		}
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: "babel-loader",
				exclude: /node_modules/
			},
			{
				test: /\.jpe?g$|\.gif$|\.png$|\.ttf$|\.eot$|\.svg$/,
				use: "file-loader?name=[name].[ext]?[hash]"
			},
			{
				test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: "url-loader?limit=10000&mimetype=application/fontwoff"
			},
			{
				test: /\.scss$/,
				use: ["style-loader", "css-loader", "sass-loader"]
			},
			{
				use: ExtractTextPlugin.extract({
					use: ["css-loader", "less-loader"]
				}),
				test: /\.less$/
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"]
			}
		]
	},
	plugins: [
		new StartServerPlugin("server.js"),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new ExtractTextPlugin({
			filename: "[name].[md5:contenthash:hex:20].css"
		}),
		new webpack.DefinePlugin({
			"process.env": {
				WEBPACK: JSON.stringify(true),
				BUILD_TARGET: JSON.stringify("server")
			}
		})
	],
	output: {
		path: path.join(__dirname, '/client/.dist'),
		filename: "server.js"
	}
};
