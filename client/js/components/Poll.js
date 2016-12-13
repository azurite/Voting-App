const React = require("react");
const { connect } = require("react-redux");
const { Chart } = require("react-google-charts");
const { Grid, Row, Col, Button, Form, FormControl, FormGroup, ControlLabel } = require("react-bootstrap");
const axios = require("axios");
const voteStore = require("../utils/voteStore");
const actions = require("../actions/vote-actions");
const format = require("../utils/format");
const Loading = require("./LoadingIcon");
const NotFound = require("./PollNotFound");

function voteOnPoll(url, vote, cb) {
  axios.post(url, vote)
    .then((res) => { cb(null, res); })
    .catch((err) => { cb(err); });
}

const PollDetails = React.createClass({
  propTypes: {
    polldata: React.PropTypes.object,
    didVote: React.PropTypes.bool,
    username: React.PropTypes.string,
    submitVote: React.PropTypes.func.isRequired
  },
  getInitialState: function() {
    return {
      activeOption: ""
    };
  },
  componentDidMount: function() {
    this.setState({
      activeOption: this.props.polldata.body.options[0].option
    });
  },
  changeOpt: function(e) {
    this.setState({ activeOption: e.target.value });
  },
  render: function() {
    const poll = this.props.polldata;
    if(poll) {
      return (
        <div className="poll-detail-view">
          <h2 className="text-center">{poll.body.title}</h2>
          <div className="line"/>
          <Form onSubmit={this.props.submitVote.bind(this, { id: poll.id, username: this.props.username, option: this.state.activeOption })} id="pollDetail">
            <FormGroup controlId="pollSelect">
              <ControlLabel>Select an option</ControlLabel>
              <FormControl componentClass="select" value={this.state.activeOption} onChange={this.changeOpt}>
                {poll.body.options.map((opt, i) => {
                  return (<option key={i} value={opt.option}>{opt.option}</option>);
                })}
              </FormControl>
            </FormGroup>
            <FormGroup>
              <Button className="vote-btn" type="submit">Vote</Button>
              {this.props.didVote && <span className="error-msg">{this.props.didVote}</span>}
              <a
                className="btn btn-primary pull-right"
                href="https://twitter.com/share"
                target="_blank"
                data-text="Check out my awesome Poll"
                data-url={"https://www.votinator.herokuapp.com/polls/" + poll.id}
              >
                <i className="fa fa-twitter"></i> Share
              </a>
            </FormGroup>
          </Form>
          <span>{"Created By: " + poll.author}</span>
          <span className="pull-right">{"Created At: " + format(poll.createdAt)}</span>
        </div>
      );
    }
    else {
      return (
        <NotFound/>
      );
    }
  }
});

const Poll = React.createClass({
  propTypes: {
    params: React.PropTypes.object,
    polldata: React.PropTypes.object,
    username: React.PropTypes.string,
    didVote: React.PropTypes.bool,
    submitVote: React.PropTypes.func.isRequired
  },
  transformPollData: function() {
    var head = ["option", "votes"];

    if(!this.props.polldata) {
      return [head, ["no data", 0]];
    }
    var data = this.props.polldata.body.options;

    if(this.props.polldata.body.totalVotes === 0) {
      return [head, ["No votes yet", 1]];
    }

    var body = data.map((opt) => {
      return [opt.option, opt.votes];
    });

    return [head].concat(body);
  },
  render: function() {
    return (
      <Grid fluid className="container-aug">
        <Row>
          <Col className="poll-container" xs={10} xsOffset={1}>
            <Col md={6} sm={10} xs={10} mdOffset={0} smOffset={1} xsOffset={1}>
              <div className="poll-chart-wrapper">
                <Chart
                  chartType="PieChart"
                  width="100%"
                  height="320px"
                  data={this.transformPollData()}
                  loader={<Loading size="fa-3x"/>}
                  options={{ title: this.props.polldata ? "" : "No data can be displayd" }}
                />
              </div>
            </Col>
            <Col md={5} sm={10} xs={10} mdOffset={0} smOffset={1} xsOffset={1}>
              <PollDetails
                polldata={this.props.polldata}
                submitVote={this.props.submitVote}
                username={this.props.username}
                didVote={this.props.didVote}
              />
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
    }()),
    didVote: state.polls.didVote,
    username: state.user && state.user.username
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    submitVote: function(vote, e) {
      e.preventDefault();
      if(!voteStore.hasVotedOn(vote.username, vote.id)) {
        voteStore.push(vote.username, vote.id);

        dispatch(actions.vote(vote));
        voteOnPoll("/api/vote", vote, (err, res) => {
          if(err || res.error) {
            dispatch(actions.voteError(err || res.error));
            return;
          }
        });
      }
      else {
        dispatch(actions.toggleDidVoteMsg());
        setTimeout(dispatch, 2000, actions.toggleDidVoteMsg());
      }
    }
  };
};

const PollContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false }
)(Poll);

module.exports = PollContainer;
