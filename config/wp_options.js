const fs = require("fs");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const PurifyCSSPlugin = require("purifycss-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

exports.devServer = function(options) {
  return {
    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      stats: "errors-only",
      host: options.host,
      port: options.port
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin({
        multistep: true
      })
    ]
  };
};

exports.minify = function() {
  return {
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ]
  };
};

exports.deduplicate = function() {
  return {
    plugins: [
      new webpack.optimize.DedupePlugin()
    ]
  };
};

exports.clean = function(path) {
  return {
    plugins: [
      new CleanWebpackPlugin([path], {
        root: process.cwd()
      })
    ]
  };
};

exports.extractCSS = function(options) {
  return {
    module: {
      loaders: [
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract("style", "css"),
          include: options.include
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin(options.chunkhash ? "[name].[chunkhash].css" : "[name].css")
    ]
  };
};

exports.purifyCSS = function(paths) {
  return {
    plugins: [
      new PurifyCSSPlugin({
        rootPath: process.cwd(),
        paths: paths
      })
    ]
  };
};

exports.htmlPlugin = function(options) {
  return {
    plugins: [
      new HtmlWebpackPlugin({
        template: options.template
      })
    ]
  };
};

exports.extractBundle = function(options) {
  const entry = {};
  entry[options.name] = options.entries;
  return {
    entry: entry,
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        names: [options.name, "manifest"]
      })
    ]
  };
};

exports.setFreeVariables = function() {
  return {
    plugins: [
      new webpack.DefinePlugin({
        "process.env": {
          "NODE_ENV": JSON.stringify(process.env.NODE_ENV)
        }
      })
    ]
  };
};

exports.nodeModules = function() {
  const nodeModules = {};
  fs.readdirSync("node_modules")
    .filter(function(mod) {
      return [".bin"].indexOf(mod) === -1;
    })
    .forEach(function(mod) {
      nodeModules[mod] = "commonjs " + mod;
    });
  return {
    externals: nodeModules
  };
};

exports.pugLoader = function(options) {
  return {
    module: {
      loaders: [
        {
          test: /\.pug$/,
          loaders:["pug"],
          include: options.include
        },
      ]
    }
  };
};

exports.babelLoader = function(options) {
  return {
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loaders: ["babel"],
          include: options.include
        }
      ]
    }
  };
};
