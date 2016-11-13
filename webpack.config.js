const path = require("path");
const options = require("./config/wb_options");
const merge = require("webpack-merge");
const validate = require("webpack-validator");

const PATHS = {
  app: path.join(__dirname, "client", "js"),
  style: path.join(__dirname, "client", "css", "main.css"),
  build: {
    client: path.join(__dirname, "build", "client"),
    server: path.join(__dirname, "build", "server")
  }
};

const common = {
  entry: {
    app: PATHS.app,
    style: PATHS.style
  },
  output: {
    path: PATHS.build.client,
    filename: "[name].js"
  },
  resolve: {
    extensions: ["", ".js", ".jsx"]
  }
};

var config = {};

switch(process.env.npm_lifecycle_event) {
  case "start:dev":
    config = merge(
      common,
      { devtool: "eval-source-map" },
      options.htmlPlugin({ template: path.join(__dirname, "client", "index.pug") }),
      options.pugLoader({ include: path.join(__dirname, "client") }),
      options.babelLoader({ include: PATHS.app }),
      options.extractCSS({ include: PATHS.style, chunkhash: false }),
      options.devServer({
        host: process.env.HOST,
        port: process.env.PORT
      })
    );
    break;

  case "build:client":
    config = merge(
      common,
      {
        devtool: "source-map",
        output: {
          path: PATHS.build.client,
          filename: "[name].[chunkhash].js",
          chunkFilename: "[chunkhash].js"
        }
      },
      options.clean(PATHS.build.client),
      options.setFreeVariables(),
      options.extractBundle({ name: "vendor", entries: ["react", "react-dom", "react-router"] }),
      options.minify(),
      options.htmlPlugin({ template: path.join(__dirname, "client", "index.pug") }),
      options.pugLoader({ include: path.join(__dirname, "client") }),
      options.babelLoader({ include: PATHS.app }),
      options.extractCSS({ include: PATHS.style, chunkhash: true }),
      options.purifyCSS([path.join(__dirname, "client", "css")])
    );
    break;

  case "build:server":
    config = merge(
      common,
      {
        entry: path.resolve(__dirname, "server.js"),
        target: "node",
        output: {
          path: PATHS.build.server,
          filename: "backend.js"
        },
        devtool: "source-map"
      },
      options.babelLoader({ include: [PATHS.app, path.resolve(__dirname, "server.js")] }),
      options.clean(PATHS.build.server),
      options.nodeModules()
    );
    break;

  default:
    config = merge(
      common,
      options.babelLoader({ include: PATHS.app }),
      options.htmlPlugin({ template: path.join(__dirname, "client", "index.pug") }),
      options.pugLoader({ include: path.join(__dirname, "client") }),
      options.extractCSS({ include: PATHS.style, chunkhash: false })
    );
}

module.exports = validate(config, { quiet: true });
