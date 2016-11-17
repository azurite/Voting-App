const React = require("react");
const { Grid, Row, Col, Button, Form, FormGroup, FormControl, ControlLabel, Checkbox } = require("react-bootstrap");

const ExternalLogin = React.createClass({
  propTypes: {
    children: React.PropTypes.string,
    id: React.PropTypes.string.isRequired,
    login: React.PropTypes.func.isRequired
  },
  render: function() {
    return (
      <Button id={this.props.id} bsSize="large" className="accordion" onClick={this.props.login} block>
        {this.props.children}
      </Button>
    );
  }
});

const EmailLogin = React.createClass({
  propTypes: {
    toggleEmail: React.PropTypes.func.isRequired
  },
  render: function() {
    return (
      <Button bsSize="large" className="accordion" onClick={this.props.toggleEmail} block>
        Login with Email
      </Button>
    );
  }
});

const EmailForm = React.createClass({
  propTypes: {
    open: React.PropTypes.bool.isRequired
  },
  getInitialState: function() {
    return {
      email: "",
      password: ""
    };
  },
  handleSubmit: function() {
    //handle native login here (maybe add remember me functionality)
  },
  handleChange: function(e) {
    switch(e.target.id) {
      case "nativeEmail":
        this.setState({ email: e.target.value });
        break;

      case "nativePassword":
        this.setState({ password: e.target.value });
        break;
    }
    return false;
  },
  render: function() {
    return (
      <div className={this.props.open ? "panel show" : "panel"}>
        <Form horizontal onSubmit={this.handleSubmit}>

          <FormGroup controlId="nativeEmail">
            <Col componentClass={ControlLabel} sm={2}>
              Email
            </Col>
            <Col sm={10}>
              <FormControl type="email" placeholder="Email" value={this.state.email} onChange={this.handleChange}/>
            </Col>
          </FormGroup>

          <FormGroup controlId="nativePassword">
            <Col componentClass={ControlLabel} sm={2}>
              Password
            </Col>
            <Col sm={10}>
              <FormControl type="password" placeholder="Password" value={this.state.password} onChange={this.handleChange}/>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col sm={10} smOffset={2}>
              <Checkbox>Remember Me</Checkbox>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col sm={10} smOffset={2}>
              <Button type="submit">Login</Button>
            </Col>
          </FormGroup>

        </Form>
      </div>
    );
  }
});

const Login = React.createClass({
  getInitialState: function() {
    return {
      emailOpen: false
    };
  },
  toggleEmailLogin: function() {
    this.setState({
      emailOpen: !this.state.emailOpen
    });
  },
  login: function() {
    //handle external login here
  },
  render: function() {
    return (
      <Grid fluid>
        <Row>
          <Col md={4} sm={6} mdOffset={4} smOffset={3}>
            <EmailLogin toggleEmail={this.toggleEmailLogin}/>
            <EmailForm open={this.state.emailOpen}/>
            <ExternalLogin id="github" login={this.login}>Login with Github</ExternalLogin>
            <ExternalLogin id="twitter" login={this.login}>Login with Twitter</ExternalLogin>
          </Col>
        </Row>
      </Grid>
    );
  }
});

module.exports = Login;
