const types = require("./action-manifest");

module.exports = {
  vote: function(vote) {
    return {
      type: types.VOTE,
      vote: vote
    };
  },
  voteError: function(err) {
    return {
      type: types.VOTE_ERROR,
      er: err
    };
  }
};
