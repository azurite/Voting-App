require("./poll");
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;

const account = new Schema({
  email: { type: String, unique: true },
  ownPolls: [{ type: Schema.Types.ObjectId, ref: "poll" }]
});

account.plugin(passportLocalMongoose, {
  populateFields: "ownPolls",
  errorMessages: true
});

account.statics.getUpdatedUser = function(username, cb) {
  this.findOne({ username: username }, { _id: 0, __v: 0 })
    .populate("ownPolls")
    .exec((err, user) => {
      if(err) {
        return cb(err, null);
      }
      var formatted = user.ownPolls.map((poll) => {
        return {
          id: poll._id.toString(16),
          author: user.username,
          createdAt: poll.createdAt,
          body: {
            title: poll.body.title,
            totalVotes: poll.body.totalVotes,
            options: poll.body.options
          }
        };
      });

      var formattedUser = {
        username: user.username,
        email: user.email,
        ownPolls: formatted
      };

      cb(null, formattedUser);
    });
};

module.exports = mongoose.model("account", account);
