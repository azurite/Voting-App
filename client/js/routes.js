const React = require("react");
const { Route, IndexRoute } = require("react-router");

const App = require("./components/App");
const Home = require("./components/Home");
const Polls = require("./components/Polls");
const Poll = require("./components/Poll");
const Login = require("./components/Login");
const Register = require("./components/Register");

module.exports = (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="/polls" component={Polls}/>
    <Route path="/polls/:pollId" component={Poll}/>
    <Route path="/login" component={Login}/>
    <Route path="/register" component={Register}/>
  </Route>
);
