require("dotenv").config({ path: "config/.env" });

const path = require("path");
const express = require("express");
const app = express();

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Account = require("./models/account");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");
mongoose.connect(process.env.DB_URI);

const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  }),
  cookie: {
    maxAge: 14 * 24 * 60 * 60 * 1000 // 2 weeks
  },
  resave: false,
  saveUninitialized: false
};

const serveStatic = require("serve-static");
const logger = require("connect-logger");
const configureApi = require("./app/api/root");
const initializeStore = require("./app/initialize-store");
const configureRoutes = require("./app/routes");

app.set("view engine", "pug");
app.set("views", path.join(process.cwd(), "client"));

app.use(logger());
app.use(serveStatic(path.join(process.cwd(), "build", "client")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

configureApi(app);
initializeStore(app);
configureRoutes(app);

app.listen(process.env.PORT || 8080);
