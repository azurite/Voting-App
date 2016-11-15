const React = require("react");
const { Link } = require("react-router");

module.exports = React.createClass({
  displayName: "App",
  propTypes: {
    children: React.PropTypes.node
  },
  render: function() {
    return (
      <div className="pure-menu pure-menu-horizontal">
        <ul className="pure-menu-list">
          <li className="pure-menu-item"><Link to="/" className="pure-menu-link">Voting App</Link></li>
          <li className="pure-menu-item"><Link to="/polls" className="pure-menu-link">Polls</Link></li>
          <li className="pure-menu-item"><Link to="/login" className="pure-menu-link">Login</Link></li>
          <li className="pure-menu-item"><Link to="/register" className="pure-menu-link">Register</Link></li>
        </ul>
        {this.props.children}
      </div>
    );
  }
});
