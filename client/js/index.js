const React = require("react");
const { createStore } = require("redux");
const ReactDOM = require("react-dom");
const { Router, browserHistory } = require("react-router");
const { Provider } = require("react-redux");

const routes = require("./routes");
const reducer = require("./reducers/root-reducer");
const initialState = require("./reducers/initialState");

function getInitialState() {
  if(window.__PRELOADED_STATE__) {
    if(typeof window.__PRELOADED_STATE__ === "object") {
      return window.__PRELOADED_STATE__;
    }
    if(typeof window.__PRELOADED_STATE__ === "string") {
      return JSON.parse(window.__PRELOADED_STATE__);
    }
  }
  return initialState;
}

const store = createStore(reducer, getInitialState());

ReactDOM.render(
  <Provider store={store}>
    <Router routes={routes} history={browserHistory}/>
  </Provider>,
  document.getElementById("app")
);
