const React = require("react");
const { Link } = require("react-router");
const { Col } = require("react-bootstrap");
//const { LinkContainer } = require("react-router-bootstrap");

function format(date) {
  return new Date(date).toString().split(" ").slice(0, -2).join(" ");
}

const Poll = React.createClass({
  propTypes: {
    data: React.PropTypes.object.isRequired
  },
  render: function() {
    return (
      <Col md={6} mdOffset={3} sm={8} smOffset={2} xs={10} xsOffset={1}>
        <Link to={"/polls/" + this.props.data.id}>
          <div className="pollcard">
            <h3 className="text-center">{this.props.data.body.title}</h3>
            <span>{"Created by: " + this.props.data.author}</span>
            <span className="pull-right">{"Created at: " + format(this.props.data.createdAt)}</span>
          </div>
        </Link>
      </Col>
    );
  }
});

module.exports = Poll;
