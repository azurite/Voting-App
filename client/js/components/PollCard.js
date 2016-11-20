const React = require("react");
const { Col } = require("react-bootstrap");

const Poll = React.createClass({
  propTypes: {
    data: React.PropTypes.object.isRequired
  },
  render: function() {
    return (
      <Col md={6} mdOffset={3} sm={8} smOffset={2} xs={10} xsOffset={1}>
        <div className="pollcard">
          <h1>{this.props.data.body.title}</h1>
          <ul>
            {this.props.data.body.options.map((opt, i) => {
              return (<li key={i}>{opt.option + ": " + opt.votes}</li>);
            })}
          </ul>
          <h4>{"from: " + this.props.data.author}</h4>
        </div>
      </Col>
    );
  }
});

module.exports = Poll;
