const path = require("path");
const options = require("./config/wp_options");
const merge = require("webpack-merge");
const validate = require("webpack-validator");

const PATHS = {
  app: path.join(__dirname, "client", "js"),
  style: [
    path.join(__dirname, "client", "css", "main.css"),
    path.join(__dirname, "node_modules", "purecss")
  ],
  css: path.join(__dirname, "client", "css"),
  build: {
    client: path.join(__dirname, "build", "client"),
    server: path.join(__dirname, "build", "server")
  },
  client: path.join(__dirname, "client"),
  template: path.join(__dirname, "client", "index.pug"),
  server: path.resolve(__dirname, "server.js")
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
      { entry: { style: PATHS.style[0] } },
      options.htmlPlugin({ template: PATHS.template }),
      options.pugLoader({ include: PATHS.client }),
      options.babelLoader({ include: PATHS.app }),
      options.extractCSS({ include: PATHS.style[0], chunkhash: false }),
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
      options.deduplicate(),
      options.minify(),
      options.htmlPlugin({ template: PATHS.template }),
      options.pugLoader({ include: PATHS.client }),
      options.babelLoader({ include: PATHS.app }),
      options.extractCSS({ include: PATHS.style, chunkhash: true }),
      options.purifyCSS([PATHS.css])
    );
    break;

  case "build:server":
    config = merge(
      common,
      {
        entry: PATHS.server,
        target: "node",
        output: {
          path: PATHS.build.server,
          filename: "backend.js"
        },
        devtool: "source-map"
      },
      options.clean(PATHS.build.server),
      options.nodeModules(),
      options.setFreeVariables(),
      options.deduplicate(),
      options.minify(),
      options.babelLoader({ include: [PATHS.app, PATHS.server] })
    );
    break;

  default:
    config = merge(
      common,
      options.babelLoader({ include: PATHS.app }),
      options.htmlPlugin({ template: PATHS.template }),
      options.pugLoader({ include: PATHS.client }),
      options.extractCSS({ include: PATHS.style, chunkhash: false })
    );
}

module.exports = validate(config, { quiet: true });
