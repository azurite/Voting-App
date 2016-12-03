const React = require("react");
const { connect } = require("react-redux");
const { Grid, Row, Col, Button, Form, FormGroup, FormControl, ControlLabel, HelpBlock } = require("react-bootstrap");

const RegisterButton = require("./AuthButton");
const actions = require("../actions/register-actions");

function pretendRegister(path, data, cb) {
  const user = require("../dev/sampleAccount");
  setTimeout(cb, 1000, null, user);
}

const Register = React.createClass({
  propTypes: {
    getValidationState: React.PropTypes.func.isRequired,
    email: React.PropTypes.object.isRequired,
    password: React.PropTypes.object.isRequired,
    password_confirm: React.PropTypes.object.isRequired,
    handleChange: React.PropTypes.func.isRequired,
    validate: React.PropTypes.func.isRequired,
    handleSubmit: React.PropTypes.func.isRequired,
    reqPending: React.PropTypes.bool.isRequired,
    err: React.PropTypes.object
  },
  render: function() {
    return (
      <Grid fluid className="container-aug">
        <Row>
          <Col md={4} sm={6} xs={8} mdOffset={4} smOffset={3} xsOffset={2}>
            <RegisterButton>Register</RegisterButton>
            <Form horizontal id="registerAccount" onSubmit={this.props.handleSubmit}>

              <FormGroup controlId="registerEmail" validationState={this.props.getValidationState(this.props.email)}>
                <Col componentClass={ControlLabel} sm={2}>
                  Email
                </Col>
                <Col sm={10}>
                  <FormControl
                    type="email"
                    placeholder="Email"
                    value={this.props.email.value}
                    onChange={this.props.handleChange}
                    onBlur={this.props.validate.bind(this, "email")}/>
                  {this.props.email.isValid === false ? <HelpBlock>Invalid Email Address</HelpBlock> : null}
                </Col>
              </FormGroup>

              <FormGroup controlId="registerPassword" validationState={this.props.getValidationState(this.props.password)}>
                <Col componentClass={ControlLabel} sm={2}>
                  Password
                </Col>
                <Col sm={10}>
                  <FormControl
                    type="password"
                    placeholder="Password"
                    value={this.props.password.value}
                    onChange={this.props.handleChange}
                    onBlur={this.props.validate.bind(this, "password")}/>
                  {this.props.password.isValid === false ? <HelpBlock>min 8 characters</HelpBlock> : null}
                </Col>
              </FormGroup>

              <FormGroup controlId="registerPasswordConfirm" validationState={this.props.getValidationState(this.props.password_confirm)}>
                <Col sm={10} smOffset={2}>
                  <FormControl
                    type="password"
                    placeholder="confirm password"
                    value={this.props.password_confirm.value}
                    onChange={this.props.handleChange}
                    onBlur={this.props.validate.bind(this, "password_confirm")}/>
                  {this.props.password_confirm.isValid === false ? <HelpBlock>Passwords don't match</HelpBlock> : null}
                </Col>
              </FormGroup>

              <FormGroup>
                <Col sm={10} smOffset={2}>
                  <Button className="signup-btn" type="submit">Sign up</Button>
                  {this.props.reqPending ? <i className="fa fa-spinner fa-spin"></i> : null}
                  {this.props.err ? <span className="error-msg">{this.props.err.message}</span> : null}
                </Col>
              </FormGroup>

            </Form>
          </Col>
        </Row>
      </Grid>
    );
  }
});

const mapStateToProps = function(state) {
  return {
    getValidationState: function(input) {
      return input.isValid === null ? null : (input.isValid ? "success" : "error");
    },
    email: state.register.email,
    password: state.register.password,
    password_confirm: state.register.password_confirm,
    reqPending: state.register.reqPending,
    err: state.register.err
  };
};

const mapDispatchToProps = function(dispatch, ownProps) {
  return {
    handleChange: function(e) {
      switch(e.target.id) {
        case "registerEmail":
          dispatch(actions.updateInput("email", e.target.value));
          break;

        case "registerPassword":
          dispatch(actions.updateInput("password", e.target.value));
          break;

        case "registerPasswordConfirm":
          dispatch(actions.updateInput("password_confirm", e.target.value));
          break;
      }
    },
    validate: function(field) {
      dispatch(actions.validateInput(field));
    },
    handleSubmit: function(e) {
      e.preventDefault();
      dispatch(actions.register());
      pretendRegister("../path/to/api", {}, function(err, user) {
        if(err) {
          dispatch(actions.registerError(err));
          return;
        }
        dispatch(actions.registerSuccess(user));
        ownProps.router.push("/user/" + user.id);
      });
    }
  };
};

const RegisterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);

module.exports = RegisterContainer;
