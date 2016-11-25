const React = require("react");
const { createStore } = require("redux");
const { Provider } = require("react-redux");
const { renderToString } = require("react-dom/server");
const { match, RouterContext } = require("react-router");

const reducer = require("../client/js/reducers/root-reducer");
const initialState = require("../client/js/reducers/initialState");
const routes = require("../client/js/routes");
const assets = require("./serve-bundles.js")({
  root: process.cwd(),
  path: "/build/client",
  publicPath: "/",
  sort: {
    scripts: ["manifest", "vendor", "style", "app"]
  }
});

const store = createStore(reducer, initialState);
const preloadedState = store.getState();

module.exports = function(app) {

  app.get("*", (req, res) => {
    match({ routes: routes, location: req.url  }, (err, redirect, props) => {
      if(err) {
        res.status(500).send(err.message);
      }
      else if(redirect) {
        res.redirect(redirect.pathname + redirect.search);
      }
      else if(props) {
        const html = renderToString(
          <Provider store={store}>
            <RouterContext {...props}/>
          </Provider>
        );
        res.render("index", { app: html, assets: assets, preloadedState: preloadedState });
      }
      else {
        res.status(404).send("not found");
      }
    });
  });

};
