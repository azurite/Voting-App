const React = require("react");
const { Route, IndexRoute } = require("react-router");
const actions = require("./actions/login-actions");

const App = require("./components/App");
const Home = require("./components/Home");
const Polls = require("./components/Polls");
const Poll = require("./components/Poll");
const Login = require("./components/Login");
const Register = require("./components/Register");
const User = require("./components/User");
const Logout = require("./components/Logout");

const wrapStoreToRoutes = function(store) {

  const requireAuth = function(nextState, replaceState) {
    const state = store.getState();

    if(state.user === null) {
      replaceState({ pathname: "/login" });
    }
  };

  const delegateAuth = function(nextState, replaceState) {
    const state = store.getState();

    if(state.user) {
      replaceState({ pathname: "/user/" + state.login.user.id });
    }
  };

  const logout = function(nextState, replaceState) {
    const state = store.getState();

    if(state.user) {
      store.dispatch(actions.logout());
      replaceState({ pathname: "/login" });
    }
    else {
      replaceState({ pathname: "/login" });
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
      <Route path="/logout" component={Logout} onEnter={logout}/>
    </Route>
  );
};

module.exports = wrapStoreToRoutes;
