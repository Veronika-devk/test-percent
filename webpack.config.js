const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: ['babel-polyfill', 'react-hot-loader/patch', './src/app.js', './src/index.less'],
  output: {
    path: __dirname + '/public/build/',
    publicPath: 'build/',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: './public',
    port: 5000,
    disableHostCheck: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
        },
        exclude: [/node_modules/, /public/],
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!postcss-loader!less-loader',
        }),
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
  ],
};
