const React = require("react");
const ReactDOM = require("react-dom");
const { Router, browserHistory } = require("react-router");
const { Provider } = require("react-redux");

const routes = require("./routes");
const store = require("./reducers/store");

ReactDOM.render(
  <Provider store={store}>
    <Router routes={routes} history={browserHistory}/>
  </Provider>,
  document.getElementById("app")
);
