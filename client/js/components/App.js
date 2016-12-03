const React = require("react");
const { connect } = require("react-redux");
const { Navbar, Nav, NavItem } = require("react-bootstrap");
const { LinkContainer, IndexLinkContainer } = require("react-router-bootstrap");
const Footer = require("./Footer");

const App = React.createClass({
  propTypes: {
    children: React.PropTypes.node,
    user: React.PropTypes.object
  },
  dynamicMenu: function() {
    if(this.props.user) {
      return (
        <Nav pullRight>
          <LinkContainer to="/logout">
            <NavItem className="menu-item">Logout</NavItem>
          </LinkContainer>
          <LinkContainer to={"/user/" + this.props.user.id}>
            <NavItem className="menu-item">{this.props.user.email}</NavItem>
          </LinkContainer>
        </Nav>
      );
    }
    else {
      return (
        <Nav pullRight>
          <LinkContainer to="/login"><NavItem className="menu-item">Login</NavItem></LinkContainer>
          <LinkContainer to="/register"><NavItem className="menu-item">Register</NavItem></LinkContainer>
        </Nav>
      );
    }
  },
  render: function() {
    return (
      <div id="app-data-root">
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
            {this.dynamicMenu()}
          </Navbar.Collapse>
        </Navbar>
        {this.props.children}
        <Footer/>
      </div>
    );
  }
});

const mapStateToProps = function(state) {
  return {
    user: state.user
  };
};

const AppContainer = connect(
  mapStateToProps
)(App);

module.exports = AppContainer;
