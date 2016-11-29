const React = require("react");
const { Grid, Row, Col } = require("react-bootstrap");
const { connect } = require("react-redux");
const Poll = require("./PollCard");


const User = React.createClass({
  propTypes: {
    user: React.PropTypes.object,
    params: React.PropTypes.object
  },
  renderPolls: function() {
    if(this.props.user.ownPolls.length === 0) {
      return (
        <p>you currently don't have any polls</p>
      );
    }
    return this.props.user.ownPolls.map((poll, i) => {
      return (
        <Col xs={12} key={i}>
          <Poll data={poll}/>
        </Col>
      );
    });
  },
  render: function() {
    return (
      <Grid fluid className="container-aug">
        <Row>
          <Col md={5} mdOffset={1} sm={5} smOffset={1} xs={10} xsOffset={1}>
            <h2>{"Profile of: " + this.props.params.userId}</h2>
          </Col>
          <Col md={5} mdOffset={0} sm={5} smOffset={0} xs={10} xsOffset={1}>
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
