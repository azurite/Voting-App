const React = require("react");
const { connect } = require("react-redux");
const { Grid, Row, Col, Button, Form, FormControl, FormGroup, ControlLabel } = require("react-bootstrap");
const axios = require("axios");
const actions = require("../actions/vote-actions");
const d3Chart = require("../d3/piechart");
const format = require("../utils/format");

function voteOnPoll(url, vote, cb) {
  axios.post(url, vote)
    .then((res) => { cb(null, res); })
    .catch((err) => { cb(err); });
}

const voteStore = {
  hasStore: function() {
    if(typeof(Storage) !== "undefined") {
      try {
        localStorage.setItem("__test_item__", "__test_value_");
        if(localStorage.getItem("__test_item__") === "__test_value_") {
          return true;
        }
      } catch(e) {
        return false;
      }
    }
    return false;
  },
  push: function(pollId) {
    if(this.hasStore()) {
      var voted = localStorage.getItem("votedPolls");
      if(voted) {
        voted = JSON.parse(voted);
      }
      else {
        voted = [];
      }
      voted.push(pollId);
      localStorage.setItem("votedPolls", JSON.stringify(voted));
    }
  },
  hasVotedOn: function(pollId) {
    if(this.hasStore()) {
      var voted = localStorage.getItem("votedPolls");
      if(voted) {
        voted = JSON.parse(voted);
      }
      else {
        voted = [];
      }
      var cmpare = voted.find((id) => {
        return id === pollId;
      });

      return cmpare ? true : false;
    }
    return false;
  }
};

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
  componentDidUpdate: function() {
    d3Chart.update(this.props.polldata);
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
  didVote: function(id) {
    return voteStore.hasVotedOn(id);
  },
  render: function() {
    const poll = this.props.polldata;
    if(poll) {
      return (
        <div className="poll-detail-view">
          <h2 className="text-center">{poll.body.title}</h2>
          <div className="line"/>
          <Form onSubmit={this.props.submitVote.bind(this, { id: poll.id, option: this.state.activeOption })} id="pollDetail">
            <FormGroup controlId="pollSelect">
              <ControlLabel>Select an option</ControlLabel>
              <FormControl componentClass="select" value={this.state.activeOption} onChange={this.changeOpt}>
                {poll.body.options.map((opt, i) => {
                  return (<option key={i} value={opt.option}>{opt.option}</option>);
                })}
              </FormControl>
            </FormGroup>
            <FormGroup>
              <Button type="submit" disabled={this.didVote(poll.id)}>Vote</Button>
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
    submitVote: function(vote, e) {
      e.preventDefault();
      voteStore.push(vote.id);

      dispatch(actions.vote(vote));
      voteOnPoll("/api/vote", vote, (err, res) => {
        if(err || res.error) {
          dispatch(actions.voteError(err || res.error));
          return;
        }
        console.log(res);
      });
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
