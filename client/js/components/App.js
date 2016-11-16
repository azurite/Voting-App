const React = require("react");
const { Navbar, Nav, NavItem } = require("react-bootstrap");
const { LinkContainer, IndexLinkContainer } = require("react-router-bootstrap");

module.exports = React.createClass({
  displayName: "App",
  propTypes: {
    children: React.PropTypes.node
  },
  render: function() {
    return (
      <div>
        <Navbar className="navbar-custom">
          <Navbar.Header>
            <Navbar.Brand className="menu-head">Voting App</Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <IndexLinkContainer to="/"><NavItem className="menu-item">Home</NavItem></IndexLinkContainer>
              <LinkContainer to="/polls"><NavItem className="menu-item">Polls</NavItem></LinkContainer>
            </Nav>
            <Nav pullRight>
              <LinkContainer to="/login"><NavItem className="menu-item">Login</NavItem></LinkContainer>
              <LinkContainer to="/register"><NavItem className="menu-item">Register</NavItem></LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {this.props.children}
      </div>
    );
  }
});
