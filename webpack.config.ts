import 'webpack-dev-server';
import path from 'path';
import webpack from 'webpack';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import TsConfigPathsWebpackPlugin from 'tsconfig-paths-webpack-plugin';

const production = process.env.NODE_ENV === 'production';
const isWebpackServe = process.env.WEBPACK_SERVE === 'true';

export default <webpack.Configuration> {
  mode: production ? 'production' : 'development',
  devtool: production ? false : 'source-map',
  stats: {
    preset: 'minimal',
    chunks: true,
    timings: true,
    chunksSort: 'size',
  },
  entry: {
    main: './src/main.tsx',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    library: {
      type: 'module',
    },
    filename: production ? '[name].[contenthash].js' : '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/i,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
        include: [
          path.join(__dirname, './src'),
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
        include: [
          path.join(__dirname, './src/styles'),
          path.join(__dirname, './src/style.scss'),
        ],
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              icon: true,
              svgo: false,
            },
          }
        ],
        include: [
          path.resolve(__dirname, './src/assets/icons'),
        ],
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './src/index.html',
      scriptLoading: 'module',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: './src/assets', to: 'assets' },
        { from: './src/favicon.png', to: 'favicon.png' },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: production ? 'style.[contenthash].css' : 'style.css',
    }),
    isWebpackServe && new ReactRefreshWebpackPlugin(),
  ],
  resolve: {
    plugins: [
      new TsConfigPathsWebpackPlugin(),
    ],
    extensions: ['.ts', '.tsx', '.svg', '...'],
  },
  devServer: {
    hot: true,
    historyApiFallback: true,
  },
  experiments: {
    outputModule: true,
  },
  optimization: {
    runtimeChunk: 'single',
  },
};
