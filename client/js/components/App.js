const React = require("react");
const { Link } = require("react-router");

const MenuItem = React.createClass({
  propTypes: {
    to: React.PropTypes.string.isRequired,
    children: React.PropTypes.string
  },
  render: function() {
    return (
      <li className="pure-menu-item">
        <Link to={this.props.to} className="pure-menu-link menu-link">{this.props.children}</Link>
      </li>
    );
  }
});

module.exports = React.createClass({
  displayName: "App",
  propTypes: {
    children: React.PropTypes.node
  },
  render: function() {
    return (
      <div>
        <div className="pure-menu pure-menu-horizontal menu">
          <span className="pure-menu-heading">Voting App</span>
          <ul className="pure-menu-list">
            <MenuItem to="/">Home</MenuItem>
            <MenuItem to="/polls">Polls</MenuItem>
            <MenuItem to="/login">Login</MenuItem>
            <MenuItem to="/register">Register</MenuItem>
          </ul>
        </div>
        {this.props.children}
      </div>
    );
  }
});
