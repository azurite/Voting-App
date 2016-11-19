const React = require("react");
const { connect } = require("react-redux");
const { Grid, Row, Col, Button, Form, FormGroup, FormControl, ControlLabel, Checkbox } = require("react-bootstrap");

const LoginButton = require("./AuthButton");
const actions = require("../actions/login-actions");

const EmailForm = function(props) {
  return (
    <div className={props.isOpen ? "panel show" : "panel"}>
      <Form horizontal onSubmit={props.handleSubmit}>

        <FormGroup controlId="nativeEmail">
          <Col componentClass={ControlLabel} sm={2}>
            Email
          </Col>
          <Col sm={10}>
            <FormControl type="email" placeholder="Email" value={props.email} onChange={props.handleChange}/>
          </Col>
        </FormGroup>

        <FormGroup controlId="nativePassword">
          <Col componentClass={ControlLabel} sm={2}>
            Password
          </Col>
          <Col sm={10}>
            <FormControl type="password" placeholder="Password" value={props.password} onChange={props.handleChange}/>
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
};

EmailForm.propTypes = {
  isOpen: React.PropTypes.bool.isRequired,
  email: React.PropTypes.string.isRequired,
  password: React.PropTypes.string.isRequired,
  handleChange: React.PropTypes.func.isRequired,
  handleSubmit: React.PropTypes.func.isRequired
};

const Login = function(props) {
  return (
    <Grid fluid>
      <Row>
        <Col md={4} sm={6} xs={8} mdOffset={4} smOffset={3} xsOffset={2}>
          <LoginButton id="emailLogin" onClick={props.toggleEmailForm}>Login with Email</LoginButton>
          <EmailForm
            isOpen={props.emailOpen}
            email={props.email}
            password={props.password}
            handleChange={props.handleChange}
            handleSubmit={props.handleSubmit}
          />
          <LoginButton id="github" onClick={props.login}>Login with Github</LoginButton>
          <LoginButton id="twitter" onClick={props.login}>Login with Twitter</LoginButton>
        </Col>
      </Row>
    </Grid>
  );
};

Login.propTypes = {
  emailOpen: React.PropTypes.bool.isRequired,
  email: React.PropTypes.string.isRequired,
  password: React.PropTypes.string.isRequired,
  toggleEmailForm: React.PropTypes.func.isRequired,
  login: React.PropTypes.func.isRequired,
  handleChange: React.PropTypes.func.isRequired,
  handleSubmit: React.PropTypes.func.isRequired
};

const mapStateToProps = function(state) {
  return {
    emailOpen: state.login.login.emailOpen,
    email: state.login.emailForm.email,
    password: state.login.emailForm.password
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    toggleEmailForm: function() {
      dispatch(actions.toggleEmailForm());
    },
    login: function() {
      //noop (event object as argument)
    },
    handleChange: function(e) {
      switch(e.target.id) {
        case "nativeEmail":
          dispatch(actions.updateInput(e.target.value, "email"));
          break;

        case "nativePassword":
          dispatch(actions.updateInput(e.target.value, "password"));
          break;
      }
      return false;
    },
    handleSubmit: function() {
      //submit login information here (event object as argument)
    }
  };
};

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

module.exports = LoginContainer;
