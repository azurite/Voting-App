const React = require("react");
const { Link } = require("react-router");
const format = require("../utils/format");

const Poll = React.createClass({
  propTypes: {
    data: React.PropTypes.object.isRequired
  },
  render: function() {
    return (
      <Link to={"/polls/" + this.props.data.id}>
        <div className="pollcard">
          <h3 className="text-center">{this.props.data.body.title}</h3>
          <span>{"Created by: " + this.props.data.author}</span>
          <span className="pull-right">{"Created at: " + format(this.props.data.createdAt)}</span>
        </div>
      </Link>
    );
  }
});

module.exports = Poll;
