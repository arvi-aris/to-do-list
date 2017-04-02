const webpack = require('webpack');
var config = {
   entry: './main.js',

   output: {
      path:'/',
      filename: 'index.js',
   },
   plugins:[
   new webpack.DefinePlugin({
     'process.env.NODE_ENV': JSON.stringify('production')
   })
 ],

   devServer: {
      inline: true,
      port: 3000
   },

   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',

            query: {
               presets: ['es2015', 'react']
            }
         }
      ]
   }
}

module.exports = config;
