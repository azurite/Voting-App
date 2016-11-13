const React = require("react");
const { Route, IndexRoute } = require("react-router");

const App = require("./App");
const Home = require("./Home");

module.exports = (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
  </Route>
);
