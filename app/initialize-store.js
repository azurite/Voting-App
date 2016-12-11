const { createStore } = require("redux");
const reducer = require("../client/js/reducers/root-reducer");
const initialState = require("../client/js/reducers/initialState");

const Account = require("../models/account");
const Poll = require("../models/poll");
const actions = require("../client/js/actions/profile-actions");

module.exports = function(app) {
  app.get("*", (req, res, next) => {
    const store = createStore(reducer, initialState);
    req.reduxStore = store;
    next();
  });

  app.get("*", (req, res, next) => {
    if(req.isAuthenticated()) {
      Account.getUpdatedUser(req.user.username, (err, user) => {
        if(err) {
          return next(err);
        }
        req.reduxStore.dispatch(actions.updateUserData(user));
        next();
      });
    }
    else {
      next();
    }
  });

  app.get("/polls/:pollId", (req, res, next) => {
    Poll.preloadPoll(req.params.pollId, (err, poll) => {
      if(err) {
        return next(err);
      }
      if(poll) {
        req.reduxStore.dispatch(actions.preloadPoll(poll));
      }
      next();
    });
  });
};
