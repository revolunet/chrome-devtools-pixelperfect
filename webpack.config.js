var loaders = [
  {
    "test": /\.js?$/,
    "exclude": /node_modules/,
    "loader": "babel-loader"
  }
];

module.exports = {
  devtool: false,
  entry: './panel/index',
  output: {
    path: '.',
    filename: 'panel-build.js',
    publicPath: '/'
  },
  plugins: [
    
  ],
  module: {
    loaders: loaders
  }
};
