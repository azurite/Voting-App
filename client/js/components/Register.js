const React = require("react");
const { Grid, Row, Col, Button, Form, FormGroup, FormControl, ControlLabel, HelpBlock } = require("react-bootstrap");
const RegisterButton = require("./AuthButton");

const MAX_LENGTH = 8;

const Register = React.createClass({
  getInitialState: function() {
    // null=neutral, false=error, true=success
    return {
      email: {
        value: "",
        isValid: null
      },
      password: {
        value: "",
        isValid: null
      },
      password_confirm: {
        value: "",
        isValid: null
      }
    };
  },
  getValidationState: function(input) {
    if(input.value === "" || input.isValid === null) {
      return null;
    }
    if(input.isValid) {
      return "success";
    }
    return "error";
  },
  validate: function(type) {
    switch(type) {
      case "email": {
        const email = this.state.email.value;
        const valid = /[^\s@]+@[^\s@]+\.[^\s@]+/.test(email);
        if(valid) {
          this.setState({
            email: {
              value: email,
              isValid: true
            }
          });
        }
        else {
          this.setState({
            email: {
              value: email,
              isValid: email === "" ? null : false
            }
          });
        }
        break;
      }

      case "password": {
        const pw = this.state.password.value;
        const confirm_pw = this.state.password_confirm.value;
        if(pw.length >= MAX_LENGTH) {
          this.setState({
            password: {
              value: pw,
              isValid: true
            }
          });
        }
        else {
          this.setState({
            password: {
              value: pw,
              isValid: pw === "" ? null : false
            }
          });
        }

        if(pw === confirm_pw) {
          this.setState({
            password_confirm: {
              value: confirm_pw,
              isValid: true
            }
          });
        }
        else {
          this.setState({
            password_confirm: {
              value: confirm_pw,
              isValid: confirm_pw === "" ? null : false
            }
          });
        }
        break;
      }
    }
  },
  handleChange: function(e) {
    switch(e.target.id) {
      case "registerEmail":
        this.setState({
          email: {
            value: e.target.value,
            isValid: this.state.email.isValid
          }
        });
        break;

      case "registerPassword":
        this.setState({
          password: {
            value: e.target.value,
            isValid: this.state.password.isValid
          }
        });
        break;

      case "registerPasswordConfirm":
        this.setState({
          password_confirm: {
            value: e.target.value,
            isValid: this.state.password_confirm.isValid
          }
        });
        break;
    }
    return false;
  },
  handleSubmit: function() {
    //check if user input is !== "" and if it is valid befor submitting
  },
  render: function() {
    return (
      <Grid fluid>
        <Row>
          <Col md={4} sm={6} mdOffset={4} smOffset={3}>
            <RegisterButton>Register</RegisterButton>
            <Form horizontal id="registerAccount" onSubmit={this.handleSubmit}>

              <FormGroup controlId="registerEmail" validationState={this.getValidationState(this.state.email)}>
                <Col componentClass={ControlLabel} sm={2}>
                  Email
                </Col>
                <Col sm={10}>
                  <FormControl
                    type="email"
                    placeholder="Email"
                    value={this.state.email.value}
                    onChange={this.handleChange}
                    onBlur={this.validate.bind(this, "email")}/>
                  {this.state.email.isValid === false ? <HelpBlock>Invalid Email Address</HelpBlock> : null}
                </Col>
              </FormGroup>

              <FormGroup controlId="registerPassword" validationState={this.getValidationState(this.state.password)}>
                <Col componentClass={ControlLabel} sm={2}>
                  Password
                </Col>
                <Col sm={10}>
                  <FormControl
                    type="password"
                    placeholder="Password"
                    value={this.state.password.value}
                    onChange={this.handleChange}
                    onBlur={this.validate.bind(this, "password")}/>
                  {this.state.password.isValid === false ? <HelpBlock>min 8 characters</HelpBlock> : null}
                </Col>
              </FormGroup>

              <FormGroup controlId="registerPasswordConfirm" validationState={this.getValidationState(this.state.password_confirm)}>
                <Col sm={10} smOffset={2}>
                  <FormControl
                    type="password"
                    placeholder="confirm password"
                    value={this.state.password_confirm.value}
                    onChange={this.handleChange}
                    onBlur={this.validate.bind(this, "password")}/>
                  {this.state.password_confirm.isValid === false ? <HelpBlock>Passwords don't match</HelpBlock> : null}
                </Col>
              </FormGroup>

              <FormGroup>
                <Col sm={10} smOffset={2}>
                  <Button type="submit">Sign up</Button>
                </Col>
              </FormGroup>

            </Form>
          </Col>
        </Row>
      </Grid>
    );
  }
});

module.exports = Register;
