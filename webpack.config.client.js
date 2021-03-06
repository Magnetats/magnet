const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
	devtool: "inline-source-map",
	entry: [
		"react-hot-loader/patch",
		"webpack-dev-server/client?http://localhost:3001/",
		"webpack/hot/only-dev-server",
		"./client/index.jsx"
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
	target: "web",
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: "babel-loader",
				include: [
					path.join(__dirname, "client"),
					path.join(__dirname, "client/src"),
					[/node_modules[\/\\]semantic-ui-react/]
				]
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
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new ExtractTextPlugin({
			filename: "[name].[md5:contenthash:hex:20].css"
		}),
		new webpack.DefinePlugin({
			"process.env": {
				WEBPACK: JSON.stringify(true),
				BUILD_TARGET: JSON.stringify("client")
			}
		})
	],
	devServer: {
		host: "localhost",
		port: 3001,
		historyApiFallback: true,
		hot: true,
		headers: { "Access-Control-Allow-Origin": "*" }
	},
	output: {
		path: path.join(__dirname, "/client/.dist"),
		publicPath: "http://localhost:3001/",
		filename: "client.js"
	}
};
