const React = require("react");
const { connect } = require("react-redux");
const { Grid, Row, Col, Button, Form, FormControl, FormGroup, ControlLabel } = require("react-bootstrap");

function format(date) {
  return new Date(date).toString().split(" ").slice(0, -2).join(" ");
}

const Poll = React.createClass({
  propTypes: {
    params: React.PropTypes.object,
    polldata: React.PropTypes.object,
    submitVote: React.PropTypes.func.isRequired
  },
  renderPieChart: function() {
    const poll = this.props.polldata;
    if(poll) {
      return (
        <p className="text-center">Poll graphic</p>
      );
    }
    else {
      return (
        <p className="text-center">No grahpic can be displayed</p>
      );
    }
  },
  renderPollDetails: function() {
    const poll = this.props.polldata;
    if(poll) {
      return (
        <div className="poll-detail-view">
          <h2 className="text-center">{poll.body.title}</h2>
          <div className="line"/>
          <Form onSubmit={this.props.submitVote} id="pollDetail">
            <FormGroup controlId="pollSelect">
              <ControlLabel>Select an option</ControlLabel>
              <FormControl componentClass="select">
                {poll.body.options.map((opt) => {
                  return (<option value={opt.option}>{opt.option}</option>);
                })}
              </FormControl>
            </FormGroup>
            <FormGroup>
              <Button type="submit">Vote</Button>
            </FormGroup>
          </Form>
          <span>{"Created By: " + poll.author}</span>
          <span className="pull-right">{"Created At: " + format(poll.createdAt)}</span>
        </div>
      );
    }
    else {
      return (
        <p className="text-center">Sorry but this poll doesnt exist in our database</p>
      );
    }
  },
  render: function() {
    return (
      <Grid fluid className="container-aug">
        <Row>
          <Col md={4} sm={4} xs={10} mdOffset={1} smOffset={1} xsOffset={1} className="piechart">
            {this.renderPieChart()}
          </Col>
          <Col md={6} sm={6} xs={10} mdOffset={0} smOffset={0} xsOffset={1} className="polldetail">
            {this.renderPollDetails()}
          </Col>
        </Row>
      </Grid>
    );
  }
});

const mapStateToProps = function(state, ownProps) {
  return {
    polldata: state.polls.polls.polldata.find((p) => {
      return p.id === parseInt(ownProps.params.pollId, 10);
    })
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    submitVote: function(e) {
      e.preventDefault();
      //submit vote to the server here
    }
  };
};

const PollContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Poll);

module.exports = PollContainer;
