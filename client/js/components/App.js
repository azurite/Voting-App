const React = require("react");

module.exports = React.createClass({
  displayName: "App",
  propTypes: {
    children: React.PropTypes.node
  },
  render: function() {
    return (
      <div>
        <h1>Welcome example</h1>
        {this.props.children}
      </div>
    );
  }
});
