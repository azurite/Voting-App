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

module.exports = mongoose.model("account", account);
