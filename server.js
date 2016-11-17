require("dotenv").config({ path: "config/.env" });
const path = require("path");

const express = require("express");
const app = express();

const serveStatic = require("serve-static");
const configureRoutes = require("./app/routes");

app.set("view engine", "pug");
app.set("views", path.join(process.cwd(), "client"));
app.use(serveStatic(path.join(process.cwd(), "build", "client")));

configureRoutes(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("App listening on port: " + PORT);
});
