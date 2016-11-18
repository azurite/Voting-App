const React = require("react");
const { Grid, Row, Col, Button, Form, FormGroup, FormControl, ControlLabel, Checkbox } = require("react-bootstrap");
const LoginButton = require("./AuthButton");

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
  handleSubmit: function() {
    //handle native login here (maybe add remember me functionality)
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
  toggleEmailForm: function() {
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
          <Col md={4} sm={6} xs={8} mdOffset={4} smOffset={3} xsOffset={2}>
            <LoginButton id="emailLogin" onClick={this.toggleEmailForm}>Login with Email</LoginButton>
            <EmailForm open={this.state.emailOpen}/>
            <LoginButton id="github" onClick={this.login}>Login with Github</LoginButton>
            <LoginButton id="twitter" onClick={this.login}>Login with Twitter</LoginButton>
          </Col>
        </Row>
      </Grid>
    );
  }
});

module.exports = Login;
