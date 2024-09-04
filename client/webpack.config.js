const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
	const isProduction = env.NODE_ENV === 'production';
	const dotenvFilename = isProduction ? '.env.prod' : '.env.dev';

	return {
		entry: ['regenerator-runtime/runtime.js', 'index.jsx'],
		output: {
			path: path.resolve(__dirname, './dist'),
			filename: isProduction ? '[name].[contenthash].js' : '[name].js',
			publicPath: '/',
		},
		target: 'web',
		devServer: {
			historyApiFallback: true,
			proxy: [
				{
					context: ['/api'],
					target: 'http://localhost:3000',
					secure: false,
				},
			],
			port: '3030',
			static: {
				directory: path.join(__dirname, 'public'),
			},
			open: true,
			hot: true,
			liveReload: true,
		},
		resolve: {
			extensions: ['.js', '.jsx', '.json'],
		},
		module: {
			rules: [
				{
					test: /\.(js|jsx)$/,
					exclude: /node_modules/,
					use: 'babel-loader',
				},
				{
					test: /\.css$/i,
					use: [
						isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
						'css-loader',
						'postcss-loader',
					],
				},
				{
					test: /\.(png|jpe?g|gif|ico)$/i,
					loader: 'file-loader',
					options: {
						name: isProduction
							? 'assets/[name].[contenthash].[ext]'
							: 'assets/[name].[ext]',
					},
				},
			],
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: path.join(__dirname, 'public', 'index.html'),
			}),
			new Dotenv({
				path: dotenvFilename,
			}),
			new CopyPlugin({
				patterns: [
					{
						from: './public/apple-touch-icon.png',
						to: './apple-touch-icon.png',
					},
					{ from: './public/favicon-16x16.png', to: './favicon-16x16.png' },
					{ from: './public/favicon-32x32.png', to: './favicon-32x32.png' },
					{ from: './public/favicon.ico', to: './favicon.ico' },
				],
			}),
			new MiniCssExtractPlugin({
				filename: isProduction ? '[name].[contenthash].css' : '[name].css',
			}),
		],
	};
};
