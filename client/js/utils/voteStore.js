const voteStore = {
  hasStore: function() {
    if(typeof(Storage) !== "undefined") {
      try {
        localStorage.setItem("__test_item__", "__test_value_");
        if(localStorage.getItem("__test_item__") === "__test_value_") {
          localStorage.removeItem("__test_item__");
          return true;
        }
      } catch(e) {
        return false;
      }
    }
    return false;
  },
  push: function(username, pollId) {
    if(this.hasStore()) {
      var voted = localStorage.getItem("_" + username + "_" + "votedPolls");
      if(voted) {
        voted = JSON.parse(voted);
      }
      else {
        voted = [];
      }
      voted.push(pollId);
      localStorage.setItem("_" + username + "_" + "votedPolls", JSON.stringify(voted));
    }
  },
  hasVotedOn: function(username, pollId) {
    if(this.hasStore()) {
      var voted = localStorage.getItem("_" + username + "_" + "votedPolls");
      if(voted) {
        voted = JSON.parse(voted);
      }
      else {
        voted = [];
      }
      var cmpare = voted.find((id) => {
        return id === pollId;
      });

      return cmpare ? true : false;
    }
    return false;
  },
  reset: function(username) {
    if(this.hasStore()) {
      localStorage.removeItem("_" + username + "_" + "votedPolls");
    }
  }
};

module.exports = voteStore;
