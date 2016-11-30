const React = require("react");
const { Grid, Row, Col, Image, Button } = require("react-bootstrap");
const { connect } = require("react-redux");
const Poll = require("./PollCard");
const MEDIA = require("../utils/media");

const User = React.createClass({
  propTypes: {
    user: React.PropTypes.object,
    params: React.PropTypes.object
  },
  renderPolls: function() {
    if(this.props.user.ownPolls.length === 0) {
      return (
        <Col xs={12}>
          <p>You dont have any polls</p>
        </Col>
      );
    }
    return this.props.user.ownPolls.map((poll, i) => {
      return (
        <Col xs={12} key={i} className="user-poll-cards">
          <Poll data={poll}/>
          <Button className="pollcard-btn">Edit</Button>
          <Button className="pollcard-btn" bsStyle="danger">Delete</Button>
        </Col>
      );
    });
  },
  render: function() {
    return (
      <Grid fluid className="container-aug">
        <Row>

          <Col md={5} mdOffset={1} sm={10} smOffset={1} xs={10} xsOffset={1}>

            <Row>
              <Col xs={12}>
                <h2 className="text-center">{"Profile of: " + this.props.params.userId}</h2>
              </Col>
            </Row>

            <div className="line"/>

            <Row className="vertical-align">
              <Col sm={6} xs={12}>
                <Image className="profile-img" src={MEDIA + "/avatar-default.png"} responsive circle/>
              </Col>
              <Col sm={6} xs={12}>
                <h3>{this.props.user.email}</h3>
              </Col>
            </Row>

            <Row>
              <Col xs={12}>
                <Button className="create-poll-btn">Create Poll</Button>
              </Col>
            </Row>

          </Col>

          <Col md={5} mdOffset={0} sm={10} smOffset={1} xs={10} xsOffset={1}>
            <Col xs={12}>
              <h2 className="text-center">My Polls</h2>
              <div className="line"/>
            </Col>
            {this.renderPolls()}
          </Col>

        </Row>
      </Grid>
    );
  }
});

const mapStateToProps = function(state) {
  return {
    user: state.login.user
  };
};

const UserContainer = connect(
  mapStateToProps
)(User);

module.exports = UserContainer;
