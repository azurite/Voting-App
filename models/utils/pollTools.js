module.exports = {
  createRegex: function createRegex(text) {
    var final = text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    return new RegExp(final);
  },
  formatPolls: function formatPolls(cb) {
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
  },
  trim: function trim(a) {
    if(typeof a === "string") {
      return a.trim();
    }
    if(Array.isArray(a)) {
      a.forEach((opt) => {
        opt.option = opt.option.trim();
      });
      return a;
    }
    return a;
  },
  unique: function unique(arr) {
    arr.sort((a, b) => {
      var Wa = a.option, Wb = b.option, length = Math.min(Wa.length, Wb.length);
      for(var i = 0; i < length; i++) {
        if(Wa.charAt(i) >= Wb.charAt(i)) {
          return 1;
        } else {
          return -1;
        }
      }
    });

    for(var j = 0; j < arr.length - 1; j++) {
      if(arr[j].option === arr[j+1].option) {
        var idx = arr[j].votes < arr[j+1].votes ? j : j + 1;
        arr.splice(idx, 1);
      }
    }

    return arr;
  },
  use: function(target, tools) {
    var end = target;
    for(var i = 0; i < tools.length; i++) {
      end = this[tools[i]](end);
    }
    return end;
  }
};
