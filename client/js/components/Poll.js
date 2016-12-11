const React = require("react");
const { connect } = require("react-redux");
const { Grid, Row, Col, Button, Form, FormControl, FormGroup, ControlLabel } = require("react-bootstrap");
const d3Chart = require("../d3/piechart");
const format = require("../utils/format");

const PieChart = React.createClass({
  propTypes: {
    polldata: React.PropTypes.object
  },
  componentDidMount: function() {
    if(this.props.polldata) {
      d3Chart.create(
        this.d3chart,
        { width: 300, height: 320, radius: 150 },
        this.props.polldata
      );
    }
  },
  componentWillUnmount: function() {
    d3Chart.destroy();
  },
  render: function() {
    const poll = this.props.polldata;
    if(poll) {
      return (
        <div className="svg-container" ref={(node) => { this.d3chart = node; }}></div>
      );
    }
    else {
      return (
        <p className="text-center">No grahpic can be displayed</p>
      );
    }
  }
});

const PollDetails = React.createClass({
  propTypes: {
    polldata: React.PropTypes.object,
    submitVote: React.PropTypes.func.isRequired
  },
  render: function() {
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
                {poll.body.options.map((opt, i) => {
                  return (<option key={i} value={opt.option}>{opt.option}</option>);
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
  }
});

const Poll = React.createClass({
  propTypes: {
    params: React.PropTypes.object,
    polldata: React.PropTypes.object,
    submitVote: React.PropTypes.func.isRequired
  },
  render: function() {
    return (
      <Grid fluid className="container-aug">
        <Row>
          <Col className="poll-container" xs={10} xsOffset={1}>
            <Col md={5} sm={5} xs={10} mdOffset={0} smOffset={0} xsOffset={1}>
              <PieChart polldata={this.props.polldata}/>
            </Col>
            <Col md={5} sm={5} xs={10} mdOffset={1} smOffset={1} xsOffset={1}>
              <PollDetails polldata={this.props.polldata} submitVote={this.props.submitVote}/>
            </Col>
          </Col>
        </Row>
      </Grid>
    );
  }
});

const mapStateToProps = function(state, ownProps) {
  return {
    polldata: (function() {
      var polldata = state.polls.polls.polldata.find((p) => {
        return p.id === ownProps.params.pollId;
      });

      if(!polldata && state.user) {
        polldata = state.user.ownPolls.find((p) => {
          return p.id === ownProps.params.pollId;
        });
      }

      if(!polldata && state.preloadedPoll) {
        polldata = state.preloadedPoll;
      }
      
      return polldata;
    }())
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
