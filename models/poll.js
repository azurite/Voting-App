const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const poll = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "account" },
  createdAt: Date,
  body: {
    title: String,
    options: [{ option: String, votes: Number, _id: false }]
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

poll.virtual("body.totalVotes").get(function() {
  return this.body.options.reduce((prev, curr) => {
    return { votes: prev.votes + curr.votes };
  }).votes;
});

poll.statics.searchByQuery = function(search, cb) {
  if(!search) {
    return cb(null, []);
  }
  var query = search;
  if(search.charAt(0) === "/") {
    query = search.substr(1);
    switch(query) {
      case "latest":
        return (
          this.find()
          .sort({ createdAt: -1 })
          .limit(10)
          .populate("author")
          .exec(formatPolls(cb))
        );
    }
  }
  return (
    this.find({ "body.title": createRegex(query) })
    .populate("author")
    .exec(formatPolls(cb))
  );
};

poll.statics.createNewPoll = function(polldata, username, cb) {
  var PollModel = this;

  mongoose.model("account").findOne({ username: username }, (err, user) => {
    if(err) {
      return cb(err);
    }
    var newPoll = new PollModel({
      author: user,
      createdAt: Date.now(),
      body: {
        title: polldata.title,
        options: polldata.options
      }
    });

    user.ownPolls.push(newPoll);

    user.save((err) => {
      if(err) {
        return cb(err);
      }
      newPoll.save((err) => {
        if(err) {
          return cb(err);
        }
        cb(null, "success");
      });
    });
  });
};

poll.statics.editPoll = function(polldata, username, cb) {
  this.findById(polldata.id, (err, poll) => {
    if(err) {
      return cb(err);
    }
    poll.body.title = polldata.title;
    poll.body.options = polldata.options;
    poll.save((err) => {
      if(err) {
        return cb(err);
      }
      cb(null, "success");
    });
  });
};

poll.statics.deletePoll = function(id, cb) {
  this.findById(id, (err, poll) => {
    if(err) {
      return cb(err);
    }
    poll.remove((err) => {
      cb(err);
    });
  });
};

poll.pre("remove", function(next) {
  var self = this;
  mongoose.model("account").findById(this.author, (err, user) => {
    if(err) {
      return next(err);
    }

    user.ownPolls = user.ownPolls.filter((pollId) => {
      return pollId.toString(16) !== self._id.toString(16);
    });
    user.save((err) => {
      next(err);
    });
  });
});

poll.statics.preloadPoll = function(id, cb) {
  this.findOne({ _id: id })
    .populate("author")
    .exec((err, poll) => {
      if(err) {
        return cb(err);
      }

      if(poll) {
        var formatted = {
          id: poll._id.toString(16),
          author: poll.author.username,
          createdAt: poll.createdAt,
          body: {
            title: poll.body.title,
            options: poll.body.options,
            totalVotes: poll.body.totalVotes
          }
        };
        cb(null, formatted);
      }
      else {
        cb();
      }
    });
};

function createRegex(text) {
  var final = text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  return new RegExp(final);
}

function formatPolls(cb) {
  return function(err, polls) {
    if(err) {
      cb(err);
      return;
    }
    var formatted = polls.map((poll) => {
      return {
        id: poll._id.toString(16),
        author: poll.author.username,
        createdAt: poll.createdAt,
        body: {
          title: poll.body.title,
          options: poll.body.options,
          totalVotes: poll.body.totalVotes
        }
      };
    });
    cb(null, formatted);
  };
}

module.exports = mongoose.model("poll", poll);
