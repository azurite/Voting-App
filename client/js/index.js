const React = require("react");
const ReactDOM = require("react-dom");
const { Router, browserHistory } = require("react-router");

const routes = require("./components/routes");

ReactDOM.render(
  <Router routes={routes} history={browserHistory}/>,
  document.getElementById("app")
);
