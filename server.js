require("dotenv").config({ path: "config/.env" });

const path = require("path");

const React = require("react");
const { renderToString } = require("react-dom/server");
const { match, RouterContext } = require("react-router");
const routes = require("./client/js/components/routes");

const serveStatic = require("serve-static");
const express = require("express");
const app = express();

const PORT = process.env.PORT || 8080;

app.set("view engine", "pug");
app.set("views", path.join(process.cwd(), "client"));

app.use(serveStatic(path.join(process.cwd(), "build", "client")));

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
      res.render("index", { react: html });
    }
    else {
      res.status(404).send("not found");
    }
  });
});

app.listen(PORT, () => {
  /*eslint-disable*/
  console.log("App listening on port: " + PORT);
  /*eslint-enable*/
});
