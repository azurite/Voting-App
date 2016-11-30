const React = require("react");
const { Route, IndexRoute } = require("react-router");

const App = require("./components/App");
const Home = require("./components/Home");
const Polls = require("./components/Polls");
const Poll = require("./components/Poll");
const Login = require("./components/Login");
const Register = require("./components/Register");
const User = require("./components/User");

const wrapStoreToRoutes = function(store) {

  const requireAuth = function(nextState, replaceState) {
    const state = store.getState();

    if(state.login.user === null) {
      replaceState({ pathname: "/login" });
    }
  };

  const delegateAuth = function(nextState, replaceState) {
    const state = store.getState();

    if(state.login.user) {
      replaceState({ pathname: "/user/" + state.login.user.id });
    }
  };

  return (
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="/polls" component={Polls}/>
      <Route path="/polls/:pollId" component={Poll}/>
      <Route path="/login" component={Login} onEnter={delegateAuth}/>
      <Route path="/register" component={Register} onEnter={delegateAuth}/>
      <Route path="/user/:userId" component={User} onEnter={requireAuth}/>
    </Route>
  );
};

module.exports = wrapStoreToRoutes;

/*
module.exports = (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="/polls" component={Polls}/>
    <Route path="/polls/:pollId" component={Poll}/>
    <Route path="/login" component={Login}/>
    <Route path="/register" component={Register}/>
    <Route path="/user/:userId" component={User}/>
  </Route>
);
*/
