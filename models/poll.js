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

module.exports = mongoose.model("poll", poll);
