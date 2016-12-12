const voteStore = {
  hasStore: function() {
    if(typeof(Storage) !== "undefined") {
      try {
        localStorage.setItem("__test_item__", "__test_value_");
        if(localStorage.getItem("__test_item__") === "__test_value_") {
          return true;
        }
      } catch(e) {
        return false;
      }
    }
    return false;
  },
  push: function(pollId) {
    if(this.hasStore()) {
      var voted = localStorage.getItem("votedPolls");
      if(voted) {
        voted = JSON.parse(voted);
      }
      else {
        voted = [];
      }
      voted.push(pollId);
      localStorage.setItem("votedPolls", JSON.stringify(voted));
    }
  },
  hasVotedOn: function(pollId) {
    if(this.hasStore()) {
      var voted = localStorage.getItem("votedPolls");
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
  }
};

module.exports = voteStore;
