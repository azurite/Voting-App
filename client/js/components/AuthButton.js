const React = require("react");
const { Button } = require("react-bootstrap");

const AuthButton = React.createClass({
  propTypes: {
    children: React.PropTypes.string,
    id: React.PropTypes.string,
    onClick: React.PropTypes.func
  },
  render: function() {
    return (
      <Button id={this.props.id} bsSize="large" className="accordion" onClick={this.props.onClick} block>
        {this.props.children}
      </Button>
    );
  }
});

module.exports = AuthButton;
