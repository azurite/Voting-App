const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const poll = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "account" },
  createdAt: Date,
  body: {
    title: String,
    options: [{ option: String, votes: Number }]
  }
});

poll.virtual("body.totalVotes").get(function() {
  return this.body.options.reduce((prev, curr) => {
    return prev.votes + curr.votes;
  }, 0);
});

const createRegex = function(text) {
  var final = text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  return { $regex: new RegExp(final), $options: "i" };
};

const formatPolls = function(cb) {
  return function(err, polls) {
    if(err) {
      return cb(err, null);
    }
    polls.forEach((poll) => {
      poll.body.totalVotes = poll.body.totalVotes;
      poll.author = poll.author.username;
      poll.id = parseInt(poll._id.toString(), 10);
      delete poll._id;
    });
    cb(null, polls);
  };
};

poll.statics.searchByQuery = function(search, cb) {
  if(!search) {
    return cb(null, []);
  }

  var query = search;
  if(search.indexOf(0) === "/") {
    query = search.substr(1);
    switch(query) {
      case "latest":
        return (
          this.find({}, { __v: 0 })
          .sort({ createdAt: -1 })
          .limit(10)
          .populate("author")
          .exec(formatPolls(cb))
        );
    }
  }
  return (
    this.find({ title: createRegex(query) }, { __v: 0 })
    .populate("author")
    .exec(formatPolls(cb))
  );
};

module.exports = mongoose.model("poll", poll);
