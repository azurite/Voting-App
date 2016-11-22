const React = require("react");

const Poll = React.createClass({
  propTypes: {
    params: React.PropTypes.object
  },
  render: function() {
    return (
      <h1>{"Detail view of poll id: " + this.props.params.pollId}</h1>
    );
  }
});

module.exports = Poll;
