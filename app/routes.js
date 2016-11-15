const React = require("react");
const { renderToString } = require("react-dom/server");
const { match, RouterContext } = require("react-router");

const routes = require("../client/js/routes");

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
        const html = renderToString(<RouterContext {...props}/>);
        res.render("index", { app: html });
      }
      else {
        res.status(404).send("not found");
      }
    });
  });

};
