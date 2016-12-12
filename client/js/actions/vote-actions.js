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
  },
  toggleDidVoteMsg: function() {
    return {
      type: types.TOGGLE_DID_VOTE_MSG,
      message: "You already voted on this poll"
    };
  }
};
